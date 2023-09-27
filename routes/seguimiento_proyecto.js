const express = require("express");
const connection = require("../connection");
const router = express.Router();
const path = require('path');
var auth = require("../services/authentication");

const multer = require('../libs/multer');
const fs = require('fs');
const selectParams = (query = "", params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};
//obtener Etapa por id de Tipología
router.get("/getByIdTipologia/:id_tipologia", (req, res) => {
  const id_tipologia = req.params.id_tipologia;
  var query = "SELECT * FROM ETAPA  WHERE id_tipologia=? and estado='true'";
  connection.query(query, [id_tipologia], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Hubo un error al obtener Etapas por id de tiología",
      });
    } else {
      res.json(results);
    }
  });
});
router.get("/getFinanciamiento/:id_etapa_proyecto", (req, res) => {
  const { id_etapa_proyecto } = req.params;
  const query = `SELECT FN.costo_inicial AS monto_inicial,FN.costo_final AS monto_final,FN.id_entidad_financiera FROM FINANCIAMIENTO AS FN WHERE FN.id_etapa_proyecto=?`;
  connection.query(query, [id_etapa_proyecto], (err, result) => {
    if (err) {
      res.status(400).json({ msg: "error consulta", err });
    } else {
      res.json(result);
    }
  });
});
router.get("/getEtapaByIdEtapaProyecto", (req, res) => {
  // console.log(req.query);
  const { id_proyecto, id_etapa } = req.query;
  if (id_proyecto === null || id_etapa === null)
    res.status(400).json({ msg: "se deben enviar id_proyecto e id_etapa" });
  const query = ` SELECT ETP.id_etapa_proyecto,ETP.id_etapa,ETP.fecha_seguimiento,ETP.id_proyecto,ETP.fuente_de_informacion ,ETP.id_entidad_ejecutora FROM ETAPA_PROYECTO AS ETP WHERE ETP.id_proyecto = ? AND ETP.id_etapa = ? order by ETP.id_etapa_proyecto desc limit 1; `;
  connection.query(query, [id_proyecto, id_etapa], (err, result) => {
    if (err) {
      res.status(500).json({ msg: "error", err });
    } else {
      res.json(result[0] || null);
    }
  });
});
router.get("/getEtapasByIdProyecto/:id_proyecto", (req, res) => {
  const { id_proyecto } = req.params;
    const query = `SELECT ETP.id_etapa_proyecto,ETP.fuente_de_informacion,
    ETA.nombre_etapa,DATE_FORMAT(ETP.fecha_seguimiento, '%d-%m-%Y') AS fecha_seguimiento,
    SEGF.avance_seguimiento_fisico FROM ETAPA_PROYECTO AS ETP 
    JOIN ETAPA AS ETA ON ETA.id_etapa = ETP.id_etapa 
    JOIN SEGUIMIENTO_FISICO AS SEGF ON SEGF.id_etapa_proyecto = ETP.id_etapa_proyecto
    JOIN FINANCIAMIENTO AS FIN ON FIN.id_etapa_proyecto = ETP.id_etapa_proyecto
    WHERE ETP.id_proyecto = ?;`;
    // const queryAdjFin=`
    // SELECT SEGFIN.monto FROM seguimiento_financiero AS SEGFIN 
    // WHERE SEGFIN.id_financiamiento IN(?) ORDER BY SEGFIN.id_seguimiento_financiero DESC LIMIT ?;`;
  connection.query(query, [id_proyecto], async (err, result) => {
    if (err)
      res.status(500).json({ msg: "error al consultar - etap by idProyecto" });

    const avanceEtapas = [];
    for (const avance of result) {
      
      if (avanceEtapas.length === 0) {
        //const res = await selectParams(queryAdjFin,[avance.id_etapa_proyecto])
        avanceEtapas.push(avance);
      } else {
        const ava = avanceEtapas.find(
          (val) => val.nombre_etapa === avance.nombre_etapa
        );
        if (ava) {
         
          if(avance.avance_seguimiento_fisico > ava.avance_seguimiento_fisico){
            ava.avance_seguimiento_fisico = avance.avance_seguimiento_fisico;
            //ava['%_avance_financiero']
            //const res = await selectParams(queryTotalFin,[avance.id_etapa_proyecto])
          }
        } else {
          avanceEtapas.push(avance);
        }
      }
    }
    res.json(avanceEtapas);
  });
});
router.get("/getMontos/:id_etapa_proyecto", (req, res) => {

  const { id_etapa_proyecto } = req.params;
  const queryFn = `SELECT SUM(FIN.costo_final) AS coste_final FROM financiamiento AS FIN 
                  WHERE FIN.id_etapa_proyecto = ?;`;
  const queryFnIds = `SELECT FIN.id_financiamiento FROM FINANCIAMIENTO AS FIN WHERE FIN.id_etapa_proyecto = ?`;

  const querySigFn = `SELECT SEGFIN.monto FROM financiamiento AS FIN 
  JOIN seguimiento_financiero AS SEGFIN ON SEGFIN.id_financiamiento = FIN.id_financiamiento
  WHERE FIN.id_financiamiento IN(?) ORDER BY SEGFIN.id_seguimiento_financiero DESC LIMIT ?;`;
  connection.query(queryFn, [id_etapa_proyecto], (err, result1) => {
    if (err)
      res.status(500).json({ msg: "error al obtener en financiamiento", err });
    console.log(result1)
    connection.query(queryFnIds, [id_etapa_proyecto], (err, result2) => {
      if(err){
        res.status(500).json({msg:'error - obtener financiamientos ids',err})
        throw new Error(err)
      }
      console.log(result2);
      let valores=[];
      for(const {id_financiamiento} of result2){
        valores.push(id_financiamiento)
      }
      console.log(valores);
      connection.query(querySigFn, [valores,result2.length], (err, result3) => {
        if (err){
          res.status(500).json({ msg: "error al obtener en seguimiento financiero", err });
        }
        console.log(result3);
        let monto_total=0;
        for(let {monto} of result3){
          monto_total=monto_total+Number.parseInt(monto);
        }
        res.status(200).json({
          coste_final: result1[0].coste_final,
          monto_total,
        });
      });
    });
  });
});
router.get("/get_seguimientos/:id_etapa_proyecto", (req, res) => {
  const { id_etapa_proyecto } = req.params;
  const query = `SELECT SEGF.id_etapa_proyecto,SEGF.avance_seguimiento_fisico,
  DATE_FORMAT(SEGF.fecha_seguimiento_fisico, '%d-%m-%Y') AS fecha_seguimiento_fisico,SEGF.adjunto_fisico, 
    (SELECT COUNT(FIN.id_financiamiento) FROM financiamiento AS FIN WHERE FIN.id_etapa_proyecto = ?) AS 'nro_financiamientos'
    FROM SEGUIMIENTO_FISICO AS SEGF 
    WHERE SEGF.id_etapa_proyecto = ? ORDER BY SEGF.avance_seguimiento_fisico ASC;`;
  const queryFin =`
  SELECT FIN.id_financiamiento,FIN.costo_inicial,FIN.costo_final,SEGF.id_seguimiento_financiero,SEGF.monto ,SEGF.adjunto_financiero FROM financiamiento AS FIN 
	INNER JOIN seguimiento_financiero AS SEGF ON SEGF.id_financiamiento = FIN.id_financiamiento
	WHERE FIN.id_etapa_proyecto= ? ORDER BY SEGF.id_seguimiento_financiero ASC;`;
  connection.query(query, [id_etapa_proyecto,id_etapa_proyecto], (err, result) => {
    if (err)
      res
        .status(500)
        .json({ err, msg: "error al obtener seguiminetos fisicos" });
    connection.query(queryFin,[id_etapa_proyecto],(err,result2)=>{
      if(err) res.status(500).json({err,msg:'error al consultar financiamiento'});
      const seguimientos=[];
      for(let i=0;i<result.length;i++){
        const historial_seguimientos={
          avance_seguimiento_fisico:result[i].avance_seguimiento_fisico,
          avance_seguimiento_financiero:0,
          fecha_seguimiento_fisico:result[i].fecha_seguimiento_fisico,
          adjunto_fisico:result[i].adjunto_fisico,
          adjunto_financiero:null,
          
        }
        let total_financiado =0;
        let costo_final=0;
        //console.log((i+1)*result[i].nro_financiamientos);
        for(let j =i*result[i].nro_financiamientos;j<(i+1)*result[i].nro_financiamientos;j++){
          total_financiado+=Number.parseFloat(result2[j].monto);
          costo_final+=Number.parseFloat(result2[j].costo_final);
        }
        const calc = (100*total_financiado/costo_final).toFixed(2);
        historial_seguimientos.avance_seguimiento_financiero=calc;
        historial_seguimientos.adjunto_financiero = result2[i*result[i].nro_financiamientos].adjunto_financiero;
        seguimientos.push(historial_seguimientos);
      }
      res.json(seguimientos);
    })    
  });
});

router.post("/registrarEtapa_Proyecto",[multer.array('documentos')], (req, res) => {
  const files = req.files;
  console.log('archivos,',files);
  const etapa =JSON.parse(req.body.etapa);
  // const json = JSON.parse(proyecto.etapa)
  //res.json({ok:'ok',files,etapa});
  //return ;
  const {
    id_entidad_ejecutora,
    id_etapa,
    id_proyecto,
    fuente_de_informacion,
    fecha_seguimiento,
    ...resForm
  } = etapa;
  const query = `INSERT INTO ETAPA_PROYECTO (fecha_seguimiento,id_etapa,id_proyecto,fuente_de_informacion,id_entidad_ejecutora) VALUES(?,?,?,?,?);`;
  connection.query(
    query,
    [
      fecha_seguimiento,
      id_etapa,
      id_proyecto,
      fuente_de_informacion,
      id_entidad_ejecutora,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ msg: "Error interno - ETAPA PROYECTO", err });
        throw new Error(err);
      } else {
        let id_etapa_proyecto;
        connection.query(
          `select id_etapa_proyecto from etapa_proyecto order by id_etapa_proyecto desc limit 1;`,
          (err, result) => {
            if (err) {
              throw new Error(err);
            }
            // console.log(result);
            id_etapa_proyecto = result[0].id_etapa_proyecto;
            addFinaciamiento({
              ...resForm,
              id_etapa_proyecto,
              adjunto_financiero:files[1]?.filename || null,
              fecha_seguimiento,
            });
            addSeguimientoFisico({
              ...resForm,
              id_etapa_proyecto,
              adjunto_fisico:files[0]?.filename || null,
              fecha_seguimiento,
            });
            res.json({ msg: "ok", result });
          }
        );
      }
    }
  );
});
const addFinaciamiento = (resForm) => {
  const {
    financiamiento,
    seguimiento_financiamiento,
    id_etapa_proyecto,
    comentario_seguimiento_financiero: comentario,
    fecha_seguimiento,
    adjunto_financiero,
  } = resForm;

  for (fnItem in financiamiento) {
    const {
      id_entidad_financiera,
      monto_inicial: costo_inicial,
      monto_final: costo_final,
    } = financiamiento[fnItem];
    const query = `INSERT INTO FINANCIAMIENTO (costo_inicial,costo_final,id_entidad_financiera,id_etapa_proyecto) VALUES(?,?,?,?);`;
    connection.query(
      query,
      [costo_inicial, costo_final, id_entidad_financiera, id_etapa_proyecto],
      (err, result) => {
        if (err) throw new Error({ msg: "error - financiamiento", err });
        let id_financiamiento;
        connection.query(
          `select id_financiamiento from financiamiento order by id_financiamiento desc limit 1;`,
          (err, result) => {
            if (err) {
              throw new Error(err);
            }
            id_financiamiento = result[0].id_financiamiento;
            const queryFnSeg = `INSERT INTO SEGUIMIENTO_FINANCIERO (monto,comentario,id_financiamiento,fecha_seguimiento,adjunto_financiero) VALUES(?,?,?,?,?);`;
            const { monto } = seguimiento_financiamiento[fnItem];
            connection.query(
              queryFnSeg,
              [monto, comentario, id_financiamiento, fecha_seguimiento,adjunto_financiero],
              (err, result) => {
                if (err)
                  throw new Error({
                    msg: "error en seguimiento financiero",
                    err,
                  });
              }
            );
          }
        );
      }
    );
  }
};
const addSeguimientoFisico = (segForm) => {
  const {
    avance_seguimiento_fisico,
    comentario_seguimiento_fisico: comentario,
    id_etapa_proyecto,
    fecha_seguimiento,
    adjunto_fisico,
  } = segForm;
  const query = `INSERT INTO SEGUIMIENTO_FISICO (avance_seguimiento_fisico,comentario,id_etapa_proyecto,fecha_seguimiento_fisico,adjunto_fisico) VALUES(?,?,?,?,?);`;
  connection.query(
    query,
    [
      avance_seguimiento_fisico,
      comentario,
      id_etapa_proyecto,
      fecha_seguimiento,
      adjunto_fisico
    ],
    (err, result) => {
      // console.log(err,result);
      if (err) throw new Error({ msg: "error en seguimiento fisico", err });
    }
  );
};

router.post("/registrarAvanceSeguimientoProyecto", [multer.array('documentos')],(req, res) => {
  const files = req.files;
  console.log('archivos,',files);
  console.log(req.body);
  const seguimiento =JSON.parse(req.body.seguimiento);
  console.log(seguimiento);
  const {
    id_etapa_proyecto,
    avance_seguimiento_fisico,
    fecha_seguimiento,
    comentario_seguimiento_fisico,
    comentario_seguimiento_financiero,
    seguimiento_financiamiento,
    adjunto_fisico = files[0]?.filename || null,
    adjunto_financiero = files[1]?.filename || null,
  } = seguimiento;
  const querySegFis = `INSERT INTO SEGUIMIENTO_FISICO (id_etapa_proyecto,avance_seguimiento_fisico,fecha_seguimiento_fisico,comentario,adjunto_fisico) VALUES(?,?,?,?,?);`;
  connection.query(
    querySegFis,
    [
      id_etapa_proyecto,
      avance_seguimiento_fisico,
      fecha_seguimiento,
      comentario_seguimiento_fisico,
      adjunto_fisico
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ msg: "erro al insertar seguimiento - fisico" });
        throw new Error(`error al isertar: ${err}`);
      }
    }
  );
  const queryEtapa = `SELECT FN.id_financiamiento FROM FINANCIAMIENTO AS FN WHERE FN.id_etapa_proyecto = ?;`;
  let financiamiento_id = [];
  connection.query(queryEtapa, [id_etapa_proyecto], (err, result) => {
    if (err) res.status(500).json({ msg: "erro al en seleccion" });
    financiamiento_id = result;
    for (let index in seguimiento_financiamiento) {
      const querySegFn = `INSERT INTO seguimiento_financiero (id_financiamiento,monto,fecha_seguimiento,comentario,adjunto_financiero) VALUES (?,?,?,?,?);`;
      connection.query(
        querySegFn,
        [
          financiamiento_id[index].id_financiamiento,
          seguimiento_financiamiento[index].monto,
          fecha_seguimiento,
          comentario_seguimiento_financiero,
          adjunto_financiero,
        ],
        (err, result) => {
          if (err) {
            res.status(500).json({ msg: "error al insertar seguimiento" });
            throw new Error(`error: ${err}`);
          }
          
        }
        );
      }
      res.status(201).json({ msg: "insertados exitosamente" });
  });
});

router.get('/adjunto/:filename',(req,res)=>{

  const{filename} = req.params;
  //console.log(filename);
  const rutaArchivo = path.join(__dirname, '../uploads/documents', filename); // Cambia 'archivos' a tu directorio de archivos
  console.log(rutaArchivo);
  if (fs.existsSync(rutaArchivo)) {
    // Configurar encabezados de respuesta para la descarga
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Crear un flujo de lectura y enviar el archivo como respuesta
    const archivoStream = fs.createReadStream(rutaArchivo);
    archivoStream.pipe(res);
   
  } else {

    res.status(404).send(`Archivo con nombre: ${filename} no encontrado`);
  }
})
module.exports = router;
