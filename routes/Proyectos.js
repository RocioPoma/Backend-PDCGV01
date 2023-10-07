const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
const path = require('path');
//----------para archivos-----------------------------------------------------------------------------
multer = require('../libs/multer');
const fs = require('fs');
const { BADFAMILY } = require('dns');
//-----------------------------------------------------------------------------------------------------


// Ruta para obtener todos los proyectos
router.get('/get',async (req, res) => {
  // const sql = "SELECT P.id_proyecto,  P.nom_proyecto, fecha_inicio, fecha_fin, DATE_FORMAT(P.fecha_inicio, '%d-%m-%Y') as fecha_inicio_convert,  DATE_FORMAT(P.fecha_fin, '%d-%m-%Y') as fecha_fin_convert,  DATE_FORMAT(P.fecha_registro, '%d-%m-%Y') as fecha_registro,  P.area,  P.coordenada_x,  P.coordenada_y,  P.id_categoria,  P.id_tipologia,  P.id_indicador,  P.id_cuenca,  P.estado,  P.cantidad,  P.hombres,  P.mujeres,  M.nombre_municipio,  M.id_municipio,  C.nom_cuenca AS NombreCuenca,  CAT.nom_categoria AS NombreCategoria,  TIP.nom_tipologia AS NombreTipologia FROM  PROYECTO AS P JOIN PROYECTO_CIUDAD_O_COMUNIDAD AS PCOC ON P.id_proyecto = PCOC.id_proyecto JOIN CIUDAD_O_COMUNIDAD AS CC ON PCOC.id_ciudad_comunidad = CC.id JOIN MUNICIPIO AS M ON CC.id_municipio = M.id_municipio JOIN CUENCA AS C ON P.id_cuenca = C.id_cuenca JOIN CATEGORIA AS CAT ON P.id_categoria = CAT.id_categoria JOIN TIPOLOGIA AS TIP ON P.id_tipologia = TIP.id_tipologia GROUP BY P.id_proyecto;"
  const sql = `  
    SELECT 
    p.*,
    DATE_FORMAT(p.fecha_inicio, '%d-%m-%Y') AS fecha_inicio_convert,
    DATE_FORMAT(p.fecha_fin, '%d-%m-%Y') AS fecha_fin_convert,
    DATE_FORMAT(p.fecha_registro, '%d-%m-%Y') AS fecha_registro_convert,
    t.nom_tipologia,
    c.nom_categoria,
    cu.nom_cuenca,
    mu.id_municipio,
    mu.nombre_municipio,
    le.id_linea_estrategica,
    la.id_linea_accion,
    le.descripcion AS linea_estrategica,
    la.descripcion AS linea_de_accion,
    ae.descripcion AS accion_estrategica,
    i.nombre_indicador,
    (SELECT e.nombre_etapa FROM etapa_proyecto ep
    INNER JOIN etapa e ON ep.id_etapa = e.id_etapa
    WHERE ep.id_proyecto = p.id_proyecto
    ORDER BY e.id_etapa DESC
    LIMIT 1) AS ultima_etapa,
    
    (SELECT entidad_ejec.nom_entidad_ejecutora
    FROM etapa_proyecto ep_ejec
    INNER JOIN entidad_ejecutora entidad_ejec ON ep_ejec.id_entidad_ejecutora = entidad_ejec.id_entidad_ejecutora
    WHERE ep_ejec.id_proyecto = p.id_proyecto
    ORDER BY ep_ejec.id_etapa_proyecto DESC
    LIMIT 1) AS entidad_ejecutora,
    
    GROUP_CONCAT(DISTINCT ef.nom_entidad_financiera SEPARATOR ', ') AS fuentes_financiamiento

  FROM proyecto p
  LEFT JOIN tipologia t ON p.id_tipologia = t.id_tipologia
  LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
  LEFT JOIN cuenca cu ON p.id_cuenca = cu.id_cuenca
  LEFT JOIN proyecto_ciudad_o_comunidad pc ON p.id_proyecto = pc.id_proyecto
  LEFT JOIN ciudad_o_comunidad com ON pc.id_ciudad_comunidad = com.id
  LEFT JOIN alcance alc ON p.id_proyecto = alc.id_proyecto
  LEFT JOIN unidad_medicion um ON alc.id_unidad_medicion = um.id_unidad_medicion
  LEFT JOIN accion_estrategica ae ON p.id_accion_estrategica = ae.id_accion_estrategica
  LEFT JOIN linea_de_accion la ON ae.id_linea_accion = la.id_linea_accion
  LEFT JOIN linea_estrategica le ON la.id_linea_estrategica = le.id_linea_estrategica
  LEFT JOIN indicador i ON p.id_indicador = i.id_indicador
  LEFT JOIN municipio mu ON com.id_municipio = mu.id_municipio
  LEFT JOIN etapa_proyecto ep ON p.id_proyecto = ep.id_proyecto
  LEFT JOIN financiamiento f ON ep.id_etapa_proyecto = f.id_etapa_proyecto
  LEFT JOIN entidad_financiera ef ON f.id_entidad_financiera = ef.id_entidad_financiera

  GROUP BY p.id_proyecto;
 `;
      const result= await onlySelect(sql);
      const sqlComunidades=`SELECT csm.id_ciudad_comunidad FROM proyecto_ciudad_o_comunidad as csm
      where csm.id_proyecto = ?; `; 
      const sqlAlcances=`SELECT alc.id_unidad_medicion,alc.cantidad,alc.mujeres,alc.hombres FROM alcance as alc
      where alc.id_proyecto = ? order by alc.id_alcance asc;`; 
      for(const proyect of result){
        const resultComunidades = await selectParams(sqlComunidades,[proyect.id_proyecto]);
        const resultAlcances = await selectParams(sqlAlcances,[proyect.id_proyecto]);
        proyect.comunidades = resultComunidades.map(val=>val.id_ciudad_comunidad);
        proyect.alcances = resultAlcances;
      }
      res.status(200).json(result)
});

const onlySelect = (query = "") => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};
const selectParams = (query = "", params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

// Ruta para obtener un proyecto por su ID de usuario
router.get('/buscar/:ci', (req, res) => {
  const { ci } = req.params;
  const sql = `  
  SELECT 
    p.*,
    DATE_FORMAT(p.fecha_inicio, '%d-%m-%Y') AS fecha_inicio_convert,
    DATE_FORMAT(p.fecha_fin, '%d-%m-%Y') AS fecha_fin_convert,
    DATE_FORMAT(p.fecha_registro, '%d-%m-%Y') AS fecha_registro_convert,
    t.nom_tipologia,
    c.nom_categoria,
    cu.nom_cuenca,
    mu.id_municipio,
    mu.nombre_municipio,
    le.id_linea_estrategica,
    la.id_linea_accion,
    le.descripcion AS linea_estrategica,
    la.descripcion AS linea_de_accion,
    ae.descripcion AS accion_estrategica,
    i.nombre_indicador,
    GROUP_CONCAT(DISTINCT com.id SEPARATOR ', ') AS comunidades,
    alc.cantidad,
    um.nom_unidad AS unidad_medicion_alcance,   
    
    (SELECT e.nombre_etapa FROM etapa_proyecto ep
     INNER JOIN etapa e ON ep.id_etapa = e.id_etapa
     WHERE ep.id_proyecto = p.id_proyecto
     ORDER BY e.id_etapa DESC
     LIMIT 1) AS ultima_etapa,
    GROUP_CONCAT(DISTINCT ef.nom_entidad_financiera SEPARATOR ', ') AS fuentes_financiamiento,
    CASE
        WHEN u.ci IS NOT NULL THEN 'Asignado'
        ELSE 'No Asignado'
    END AS estado_asignacion

FROM proyecto p
LEFT JOIN tipologia t ON p.id_tipologia = t.id_tipologia
LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
LEFT JOIN cuenca cu ON p.id_cuenca = cu.id_cuenca
LEFT JOIN proyecto_ciudad_o_comunidad pc ON p.id_proyecto = pc.id_proyecto
LEFT JOIN ciudad_o_comunidad com ON pc.id_ciudad_comunidad = com.id
LEFT JOIN alcance alc ON p.id_proyecto = alc.id_proyecto
LEFT JOIN unidad_medicion um ON alc.id_unidad_medicion = um.id_unidad_medicion
LEFT JOIN accion_estrategica ae ON p.id_accion_estrategica = ae.id_accion_estrategica
LEFT JOIN linea_de_accion la ON ae.id_linea_accion = la.id_linea_accion
LEFT JOIN linea_estrategica le ON la.id_linea_estrategica = le.id_linea_estrategica
LEFT JOIN indicador i ON p.id_indicador = i.id_indicador
LEFT JOIN municipio mu ON com.id_municipio = mu.id_municipio
LEFT JOIN etapa_proyecto ep ON p.id_proyecto = ep.id_proyecto
LEFT JOIN financiamiento f ON ep.id_etapa_proyecto = f.id_etapa_proyecto
LEFT JOIN entidad_financiera ef ON f.id_entidad_financiera = ef.id_entidad_financiera
LEFT JOIN usuario u ON p.ci = u.ci
WHERE u.ci = ?
GROUP BY p.id_proyecto;
 `;
  connection.query(sql, ci, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//// Ruta para obtener un proyecto por su ID
router.get('/ultimoRegistro/', (req, res) => {
  const sql = 'select id_proyecto from proyecto order by id_proyecto desc limit 1 ';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Ruta para crear un nuevo proyecto
router.post('/create', (req, res) => {
  let proyecto = req.body;
  const { nom_proyecto, fecha_inicio, fecha_fin, fecha_registro, area, coordenada_x, coordenada_y, cantidad, hombres, mujeres, id_categoria, id_tipologia, id_indicador, id_cuenca, id_accion_estrategica, estado } = req.body;
  const sql = 'INSERT INTO proyecto (nom_proyecto, fecha_inicio, fecha_fin, fecha_registro,area, coordenada_x, coordenada_y, cantidad,hombres,mujeres,id_categoria, id_tipologia, id_indicador, id_cuenca, id_accion_estrategica, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)';
  connection.query(sql, [nom_proyecto, fecha_inicio, fecha_fin, fecha_registro, area, coordenada_x, coordenada_y, cantidad, hombres, mujeres, id_categoria, id_tipologia, id_indicador, id_cuenca, id_accion_estrategica, estado], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Proyecto creado correctamente' });
  });

  //console.log(proyecto.id_ciudad_comunidad);
  //llamarId(proyecto.id_ciudad_comunidad);

});

router.post('/add', multer.single('documento'), (req, res) => {
  const file = req.file;
  let proyecto = req.body;
  const alcance = JSON.parse(req.body.alcance);
  const comunidad = JSON.parse(req.body.comunidad);
  let datos = {};

  if (!file) {
    datos = {
      nom_proyecto: proyecto.nom_proyecto,
      fecha_inicio: proyecto.fecha_inicio,
      fecha_fin: proyecto.fecha_fin,
      fecha_registro: proyecto.fecha_registro,
      area: proyecto.area,
      coordenada_x: proyecto.coordenada_x,
      coordenada_y: proyecto.coordenada_y,
      id_categoria: proyecto.id_categoria,
      id_tipologia: proyecto.id_tipologia,
      id_indicador: proyecto.id_indicador,
      id_cuenca: proyecto.id_cuenca,
      id_accion_estrategica: proyecto.id_accion_estrategica,
      estado: proyecto.estado,
      documento: '',
      estado: 'true'
    }
  } else {
    console.log('Con archivo')
    datos = {
      nom_proyecto: proyecto.nom_proyecto,
      fecha_inicio: proyecto.fecha_inicio,
      fecha_fin: proyecto.fecha_fin,
      fecha_registro: proyecto.fecha_registro,
      area: proyecto.area,
      coordenada_x: proyecto.coordenada_x,
      coordenada_y: proyecto.coordenada_y,
      id_categoria: proyecto.id_categoria,
      id_tipologia: proyecto.id_tipologia,
      id_indicador: proyecto.id_indicador,
      id_cuenca: proyecto.id_cuenca,
      id_accion_estrategica: proyecto.id_accion_estrategica,
      estado: proyecto.estado,
      documento: req.file.filename,
      estado: 'true'
    }
  }

  connection.query('INSERT INTO proyecto  SET ?', [datos], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "Proyecto agregado con exito" });
    }
    else {
      return res.status(500).json(err);
    }
  });


  ObtenerIdUltimoRegistroProyecto(comunidad, alcance);
});

function ObtenerIdUltimoRegistroProyecto(comunidad, alcance) {
  
  connection.query('select id_proyecto from proyecto order by id_proyecto desc limit 1', (err, rows) => {
    const id_proyecto = rows[0].id_proyecto;

    add_proyecto_comunidad(id_proyecto, comunidad); //para agregar a la tabla (proyecto_ciudad_o_comunidad)
    add_alcance(id_proyecto, alcance); //para agregar a la tabla (alcance) que es  la relacion de las tablas (Proyecto y unidad_medicion)
    //la variable (alcance) es un array de objetos en formato JSON que tiene los atributos (cantidad, unidad)
  });
}

function add_proyecto_comunidad(id_proyecto, comunidad) {
  const query = "INSERT INTO proyecto_ciudad_o_comunidad (id_proyecto, id_ciudad_comunidad) VALUES (?, ?)";
  comunidad.forEach((id_comunidad) => {
    console.log('id_proyecto: ' + id_proyecto + '  id_ciudad_comunidad: ' + id_comunidad);
    connection.query(query, [id_proyecto, id_comunidad], (err, results) => {
      if (!err) {
        console.log('Proyecto_ciudad_comunidad inserted successfully: ', id_comunidad);
      } else {
        console.error('Error inserting Proyecto_ciudad_comunidad: ', err);
      }
    });
  });
}

function add_alcance(id_proyecto, ObjAlcance) {
  // datos = {
  //   cantidad: cantidad,
  //   id_unidad_medicion: id_unidad_medicion,
  //   id_proyecto: id_proyecto,
  //   hombres:
  // }
  // //console.log(datos); 
  // connection.query('INSERT INTO alcance  set ?', [datos], (err, results) => {
  //   // console.log('Agregado.!!!')
  // });

  const query = "INSERT INTO alcance (cantidad, id_unidad_medicion,id_proyecto,hombres,mujeres) VALUES (?,?,?,?,?)";
  ObjAlcance.forEach((alcance) => {
    //console.log('id_proyecto: ' + id_proyecto + '  id_ciudad_comunidad: ' + proyecto_comunidad.id);
    connection.query(query, [alcance.cantidad, alcance.id_unidad_medicion, id_proyecto,alcance?.hombres || null,alcance?.mujeres || null], (err, results) => {
      if (!err) {
        // console.log('id proyecto: ' + id_proyecto + ' cantidad: ' + alcance.cantidad + ' id_unidad: ' + alcance.id_unidad_medicion);
        console.log(results);
      } else {
        console.error('Error inserting Proyecto_ciudad_comunidad: ', err);
      }
    });
  });
}


// RUTA PARA ACTUALIZAR PROYECTO
router.patch('/update', multer.single('documento'), async (req, res) => {
  const file = req.file;
  let proyecto = req.body;
  const alcance = JSON.parse(req.body.alcance);
  const comunidad = JSON.parse(req.body.comunidad);
  let datos = {};

  if (!file) {
    datos = {
      nom_proyecto: proyecto.nom_proyecto,
      fecha_inicio: proyecto.fecha_inicio,
      fecha_fin: proyecto.fecha_fin,
      fecha_registro: proyecto.fecha_registro,
      area: proyecto.area,
      coordenada_x: proyecto.coordenada_x,
      coordenada_y: proyecto.coordenada_y,
      id_categoria: proyecto.id_categoria,
      id_tipologia: proyecto.id_tipologia,
      id_indicador: proyecto.id_indicador,
      id_cuenca: proyecto.id_cuenca,
      id_accion_estrategica: proyecto.id_accion_estrategica,
      estado: proyecto.estado,
      documento: proyecto.nombre_documento,
    }
  } else {
    console.log('Con archivo')
    datos = {
      nom_proyecto: proyecto.nom_proyecto,
      fecha_inicio: proyecto.fecha_inicio,
      fecha_fin: proyecto.fecha_fin,
      fecha_registro: proyecto.fecha_registro,
      area: proyecto.area,
      coordenada_x: proyecto.coordenada_x,
      coordenada_y: proyecto.coordenada_y,
      id_categoria: proyecto.id_categoria,
      id_tipologia: proyecto.id_tipologia,
      id_indicador: proyecto.id_indicador,
      id_cuenca: proyecto.id_cuenca,
      id_accion_estrategica: proyecto.id_accion_estrategica,
      estado: proyecto.estado,
      documento: req.file.filename,
    }
  }


  connection.query('UPDATE proyecto  SET ? WHERE id_proyecto = ?', [datos, proyecto.id_proyecto], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
  });

  if(alcance.length>0){
    await updateAlcanceProyecto(alcance,proyecto.id_proyecto);
  }
  if(comunidad.length>0){
    await updateComunidadProyecto(comunidad,proyecto.id_proyecto);
    
  }
  res.status(200).json({message:'actualizado con exito'});
  //ObtenerIdUltimoRegistroProyecto(comunidad, alcance, proyecto.id_unidad_medicion, proyecto.cantidad);
});
const updateAlcanceProyecto= async (alcance=[],id_proyecto=0)=>{
  const sqlDelete=`DELETE FROM alcance where id_proyecto = ?`;
  const sqlInsert=`insert into alcance (cantidad,id_unidad_medicion,id_proyecto,hombres,mujeres) values(?,?,?,?,?);`;
  try {
    await selectParams(sqlDelete,[id_proyecto]);
    for(const alc of alcance){
      await selectParams(sqlInsert,[alc.cantidad,alc.id_unidad_medicion,id_proyecto,alc.hombres,alc.mujeres]);
    }
  } catch (error) {
    console.log(error);
  }
}
const updateComunidadProyecto = async (comunidad=[],id_proyecto =0)=>{
  const sqlDelete=`DELETE FROM proyecto_ciudad_o_comunidad where id_proyecto = ?`;
  const sqlInsert=`insert into proyecto_ciudad_o_comunidad (id_proyecto,id_ciudad_comunidad) values(?,?);`;
  try {
    await selectParams(sqlDelete,[id_proyecto]);
    for(const csm of comunidad){
      await selectParams(sqlInsert,[id_proyecto,csm]);
    }
  } catch (error) {
    console.log(error);
  }

}
// RUTA PARA HABILITAR O DESHABILITAR PROYECTO
router.patch('/updateStatus', (req, res) => {
  let proyecto = req.body;

  var query = "update proyecto set estado=? where id_proyecto=?";
  connection.query(query, [proyecto.estado, proyecto.id_proyecto], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "El proyecto no existe" });
      }
      return res.status(200).json({ message: "Actualización de estado con éxito" });
    }
    else {
      return res.status(500).json(err);
    }
  })
})

// RUTA PARA ELIMINAR PROYECTO
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  eliminarProyectoComunidad(req.params.id);
  const sql = 'DELETE FROM proyecto WHERE id_proyecto = ?';
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Proyecto eliminado correctamente' });
  });
});

//----------------------------------------------/otra forma de borrar
// Agrega esta nueva ruta para eliminar un proyecto por su ID
router.delete('/dele/:id_proyecto', (req, res) => {
  const id_proyecto = req.params.id_proyecto;

  // Primero, eliminamos los registros en la tabla "proyecto_ciudad_o_comunidad"
  connection.query('DELETE FROM proyecto_ciudad_o_comunidad WHERE id_proyecto = ?', [id_proyecto], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    // A continuación, eliminamos los registros en la tabla "alcance"
    connection.query('DELETE FROM alcance WHERE id_proyecto = ?', [id_proyecto], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Finalmente, eliminamos el proyecto de la tabla "PROYECTO"
      connection.query('DELETE FROM proyecto WHERE id_proyecto = ?', [id_proyecto], (err, results) => {
        if (err) {
          return res.status(500).json(err);
        }

        return res.status(200).json({ message: "Proyecto eliminado con éxito" });
      });
    });
  });
});
//----------------------------------------------/otra forma de borrar


//funcion
function eliminarProyectoComunidad(id) {
  const sql = 'DELETE FROM proyecto_ciudad_o_comunidad WHERE id_proyecto = ?';
  connection.query(sql, id, (err, result) => {
    console.log(result);
  });
}


//----------------OTROS SERVICIOS--------------------
//ruta para obtener tipología
router.get('/get_tipologia', (req, res) => {
  const sql = 'SELECT * FROM tipologia';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


//Status Etapa 
router.put('/updateUser', (req, res) => {
  let proyecto = req.body;

  var query = "update proyecto set ci=? where id_proyecto=?";
  connection.query(query, [proyecto.ci, proyecto.id_proyecto], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "El proyecto no existe" });
      }
      return res.status(200).json({ message: "Cambio de usuario con exito" });
    }
    else {
      return res.status(500).json(err);
    }
  })
})


//Status documentos 
router.get('/listarDoc/:id_proyecto', (req, res) => {
  const { id_proyecto } = req.params;
  const sql = `  
  SELECT d.*
  FROM documento d
  INNER JOIN proyecto p ON d.id_proyecto = p.id_proyecto
  WHERE p.id_proyecto = ?;
 `;
  connection.query(sql, id_proyecto, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//---------------------------------------------------------------multer 2 

//---------------------------------------------------------------multer 2 

// Ruta para subir archivos y guardar información
/* router.post('/addDocs', [multer.array('documentos')], (req, res) => {
  const { id_proyecto, descripcion } = req.body; // Datos del proyecto
  console.log('archivos,', files);
  console.log(req.body);
  // Los archivos se han subido exitosamente, puedes manejarlos aquí
  console.log('Archivos subidos:', req.files);

  // Inserta información de cada archivo en la base de datos
  req.files.forEach((file) => {
    const nombre_documento = file.originalname; // Nombre del archivo en el servidor

    // Inserta los datos en la base de datos
    const query = 'INSERT INTO documento (nombre_documento, comentario, id_proyecto) VALUES (?, ?, ?)';
    const values = [nombre_documento, descripcion, id_proyecto];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        res.status(500).json({ message: 'Error al guardar los datos en la base de datos' });
      } else {
        console.log('Datos insertados en la base de datos:', results);
      }
    });
  });

  res.status(200).json({ message: 'Archivos y datos guardados exitosamente' });
}); */

//----------------otraforma--------------------
router.post('/upload', multer.array('files', 10), (req, res) => {
    // req.files contiene los archivos subidos
    const files = req.files;
    console.log('archivos,',files);
    console.log(req.body.comentario);
    const comentario=req.body.comentario;
    console.log(req.body.id_proyecto);
    const id_proyecto=req.body.id_proyecto;
  req.files.forEach((files) => {
    const nombre_documento = files.filename; 
    console.log(nombre_documento);
    estado=true;
    const queryDocumento = `INSERT INTO documento (nombre_documento, comentario, estado, id_proyecto) VALUES (?, ?, ?, ? );`;
   connection.query(
      queryDocumento,
      [
        nombre_documento,
        comentario,
        estado,
        id_proyecto        
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "erro al insertar documentos al proyecto" });
          throw new Error(`error al isertar: ${err}`);
        }
      }
    ); 
  })
  // Realiza alguna lógica de manejo de archivos aquí

  res.status(200).json({ message: 'Archivos subidos con éxito' });
});
//----------------otraforma--------------------

//-------------borrar archivos----
router.delete('/delete2/:id', (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre; // Obtén el nombre del cuerpo de la solicitud
  const rutaArchivo = `./uploads/documents/${nombre}`; // Reemplaza con la ruta real del archivo.

  console.log(id,nombre,rutaArchivo);
  // Realiza las operaciones de eliminación según sea necesario utilizando el ID y el nombre.

  //eliminacion en BD
  const sql = 'DELETE FROM documento WHERE id_documento = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro: ' + err.message);
      return;
    }
    console.log('Registro eliminado con éxito');
  });
  

    // Realiza la eliminación del archivofisico
    fs.unlinkSync(rutaArchivo);
 
  res.json({ message: 'Documento eliminado correctamente' });
});
//-------------------------------------



//--------------------------------------descargar ek archuvi
// Ruta para la descarga de archivos
router.get('/download/:nombreArchivo', (req, res) => {
  const nombreArchivo = req.params.nombreArchivo;
 
  const rutaArchivo = path.join(__dirname, '../uploads/documents', nombreArchivo); // Cambia 'archivos' a tu directorio de archivos
  console.log(rutaArchivo);
  // Verificar si el archivo existe

  if (fs.existsSync(rutaArchivo)) {
    // Configurar encabezados de respuesta para la descarga
    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Crear un flujo de lectura y enviar el archivo como respuesta
    const archivoStream = fs.createReadStream(rutaArchivo);
    archivoStream.pipe(res);
   
  } else {

    res.status(404).send('Archivo no encontrado');
  }
});





//--------------------------------------descargar ek archuvi

module.exports = router;