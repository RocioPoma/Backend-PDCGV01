const express = require("express");
const connection = require("../connection");
const router = express.Router();

router.get("/lineas-estrategicas", (req, res) => {
  const fechaInicioAnalisis = req.query.fechaInicioAnalisis;
  const fechaFinAnalisis = req.query.fechaFinAnalisis;

  const query = `
  SELECT
    LNE.id_linea_estrategica,
    LNE.descripcion,
    COUNT(CASE
        WHEN
            (PROY.fecha_inicio <= ? AND PROY.fecha_fin >= ?) OR
            (PROY.fecha_inicio <= ? AND PROY.fecha_fin >= ?) OR
            (PROY.fecha_inicio >= ? AND PROY.fecha_inicio <= ?) OR
            (PROY.fecha_fin >= ? AND PROY.fecha_fin <= ?)
        THEN 1
        ELSE NULL
    END) AS total
FROM linea_estrategica AS LNE
LEFT JOIN linea_de_accion AS LNA ON LNA.id_linea_estrategica = LNE.id_linea_estrategica
LEFT JOIN accion_estrategica AS ACCE ON ACCE.id_linea_accion = LNA.id_linea_accion
LEFT JOIN proyecto AS PROY ON PROY.id_accion_estrategica = ACCE.id_accion_estrategica
GROUP BY LNE.id_linea_estrategica, LNE.descripcion;`;
  connection.query(query, [fechaFinAnalisis, fechaInicioAnalisis, fechaFinAnalisis, fechaInicioAnalisis, fechaInicioAnalisis, fechaFinAnalisis, fechaInicioAnalisis, fechaFinAnalisis], (err, result) => {
    if (err)
      res
        .status(500)
        .json({ msg: "error al consultar reportes lineas estrategias", err });
    res.json(result);
  });
});

//-------------------------- REPORTE POR CATEGORIA
router.get("/categorias", (req, res) => {
  const fechaInicioAnalisis = req.query.fechaInicioAnalisis;
  const fechaFinAnalisis = req.query.fechaFinAnalisis;
  const query = `
  SELECT CAT.nom_categoria,
  COUNT(CASE
          WHEN
            (PROY.fecha_inicio <= ? AND PROY.fecha_fin >= ?) OR
            (PROY.fecha_inicio <= ? AND PROY.fecha_fin >= ?) OR
            (PROY.fecha_inicio >= ? AND PROY.fecha_inicio <= ?) OR
            (PROY.fecha_fin >= ? AND PROY.fecha_fin <= ?)
          THEN 1
          ELSE NULL
      END) AS total
  FROM categoria AS CAT
  LEFT JOIN proyecto AS PROY ON PROY.id_categoria = CAT.id_categoria
  GROUP BY CAT.id_categoria;
  `;
  connection.query(query, [fechaFinAnalisis, fechaInicioAnalisis, fechaFinAnalisis, fechaInicioAnalisis, fechaInicioAnalisis, fechaFinAnalisis, fechaInicioAnalisis, fechaFinAnalisis], (err, result) => {
    if (err)
      res
        .status(500)
        .json({ msg: "error al consultar reportes categorias", err });
    res.json(result);
  });
});

// REPORTE POR TIPOLOGIA
router.get("/tipologias", (req, res) => {
  const fechaInicioAnalisis = req.query.fechaInicioAnalisis;
  const fechaFinAnalisis = req.query.fechaFinAnalisis;
  const query = `
  SELECT TIP.nom_tipologia,
  COUNT(CASE
          WHEN
            (PROY.fecha_inicio <= ? AND PROY.fecha_fin >= ?) OR
            (PROY.fecha_inicio <= ? AND PROY.fecha_fin >= ?) OR
            (PROY.fecha_inicio >= ? AND PROY.fecha_inicio <= ?) OR
            (PROY.fecha_fin >= ? AND PROY.fecha_fin <= ?)
          THEN 1
          ELSE NULL
      END) AS total
  FROM tipologia AS TIP
  LEFT JOIN proyecto AS PROY ON PROY.id_tipologia = TIP.id_tipologia
  GROUP BY TIP.id_tipologia;
  `;
  connection.query(query, [fechaFinAnalisis, fechaInicioAnalisis, fechaFinAnalisis, fechaInicioAnalisis, fechaInicioAnalisis, fechaFinAnalisis, fechaInicioAnalisis, fechaFinAnalisis],(err, result) => {
    if (err)
      res
        .status(500)
        .json({ msg: "error al consultar reportes tipologias", err });
    res.json(result);
  });
});

// REPORTE POR ETAPA DE CADA INDICADOR
router.get("/pdc_etapa", (req, res) => {
  const fechaInicioAnalisis = req.query.fechaInicioAnalisis;
  const fechaFinAnalisis = req.query.fechaFinAnalisis;
  const query = `SELECT
    I.id_indicador,
    I.nombre_indicador,
    COUNT(DISTINCT P.id_proyecto) AS cantidad_proyectos,
    SUM(CASE 
        WHEN UltimaEtapa.ultima_etapa = 1 THEN 1
        WHEN UltimaEtapa.ultima_etapa  IN (2, 13)  THEN 1
        WHEN UltimaEtapa.ultima_etapa IN (3, 14) THEN 1
        WHEN UltimaEtapa.ultima_etapa IN (4, 12, 15) THEN 1
        WHEN UltimaEtapa.ultima_etapa IN (5, 8) THEN 1
        WHEN UltimaEtapa.ultima_etapa IN (6, 9) THEN 1
        WHEN UltimaEtapa.ultima_etapa = 7 THEN 1
        WHEN UltimaEtapa.ultima_etapa = 10 THEN 1 
        WHEN UltimaEtapa.ultima_etapa = 11 THEN 1
        ELSE 0
    END) AS Etapa_Numero,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 1 THEN 1 ELSE 0 END) AS ITCP,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 2 or UltimaEtapa.ultima_etapa = 13 THEN 1 ELSE 0 END) AS EDTP,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 3 or UltimaEtapa.ultima_etapa = 14 THEN 1 ELSE 0 END) AS Gestion_Financiamiento,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 4 or UltimaEtapa.ultima_etapa = 12 or UltimaEtapa.ultima_etapa = 15 THEN 1 ELSE 0 END) AS Ejecucion,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 5 or UltimaEtapa.ultima_etapa = 8 THEN 1 ELSE 0 END) AS Propuesta,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 6 or UltimaEtapa.ultima_etapa = 9 THEN 1 ELSE 0 END) AS Validacion,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 7 THEN 1 ELSE 0 END) AS Promulgacion,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 10 THEN 1 ELSE 0 END) AS Aprobacion,
    SUM(CASE WHEN UltimaEtapa.ultima_etapa = 11 THEN 1 ELSE 0 END) AS Organizacion
FROM
    indicador AS I
LEFT JOIN
    proyecto AS P
ON
    I.id_indicador = P.id_indicador
LEFT JOIN
    (
        SELECT
            EP1.id_proyecto,
            MAX(E.id_etapa) AS ultima_etapa
        FROM
            etapa_proyecto AS EP1
        INNER JOIN
            etapa AS E
        ON
            EP1.id_etapa = E.id_etapa
        GROUP BY
            EP1.id_proyecto
    ) AS UltimaEtapa
ON
    P.id_proyecto = UltimaEtapa.id_proyecto
GROUP BY
    I.id_indicador, I.nombre_indicador
ORDER BY
    I.id_indicador;
`;
  connection.query(query, (err, result) => {
    if (err)
      res.status(500).json({ msg: "error al consultar reportes pdc", err });
    res.json(result);
  });
});

//REPORTES INVERSION POR LINEA ESTRATEGICA
router.get("/inversion_le", (req, res) => {
  const query = `SELECT
  le.id_linea_estrategica,
  le.Inversion_meta_2025,
  le.descripcion AS linea_estrategica,
  COALESCE(SUM(f.costo_final), 0) AS inversion_total
FROM linea_estrategica le
LEFT JOIN linea_de_accion la ON le.id_linea_estrategica = la.id_linea_estrategica
LEFT JOIN accion_estrategica ae ON la.id_linea_accion = ae.id_linea_accion
LEFT JOIN proyecto p ON ae.id_accion_estrategica = p.id_accion_estrategica
LEFT JOIN etapa_proyecto ep ON p.id_proyecto = ep.id_proyecto
LEFT JOIN financiamiento f ON ep.id_etapa_proyecto = f.id_etapa_proyecto
GROUP BY le.id_linea_estrategica, le.descripcion`;
  connection.query(query, (err, result) => {
    if (err)
      res
        .status(500)
        .json({ msg: "error al consultar reporte por linea estratégica", err });
    res.json(result);
  });
});

//REPORTES INVERSION POR LINEA ESTRATEGICA DESAGREGADA POR MUNICIPIO
router.get("/inversion_desagregada_le", (req, res) => {
  const query = `SELECT
  le.id_linea_estrategica,
  le.descripcion AS linea_estrategica,
  SUM(CASE WHEN m.nombre_municipio = 'Tarija' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS Tarija,
  SUM(CASE WHEN m.nombre_municipio = 'San Lorenzo' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS "SanLorenzo",
  SUM(CASE WHEN m.nombre_municipio = 'Padcaya' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS Padcaya,
  SUM(CASE WHEN m.nombre_municipio = 'Uriondo' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS Uriondo,
  SUM(COALESCE(f.costo_final, 0)) AS inversion_total_linea
FROM
  linea_estrategica le
CROSS JOIN municipio m
LEFT JOIN proyecto p ON p.id_accion_estrategica IN (
  SELECT ae.id_accion_estrategica
  FROM accion_estrategica ae
  WHERE ae.id_linea_accion IN (
      SELECT la.id_linea_accion
      FROM linea_de_accion la
      WHERE la.id_linea_estrategica = le.id_linea_estrategica
  )
)
LEFT JOIN etapa_proyecto ep ON p.id_proyecto = ep.id_proyecto
LEFT JOIN financiamiento f ON ep.id_etapa_proyecto = f.id_etapa_proyecto
AND m.id_municipio IN (
  SELECT DISTINCT c.id_municipio
  FROM ciudad_o_comunidad c
  INNER JOIN proyecto_ciudad_o_comunidad pcc ON c.id = pcc.id_ciudad_comunidad
  WHERE pcc.id_proyecto = p.id_proyecto
)
GROUP BY le.id_linea_estrategica, le.descripcion
ORDER BY le.id_linea_estrategica;`;
  connection.query(query, (err, result) => {
    if (err)
      res
        .status(500)
        .json({
          msg: "error al consultar reportes inversión desagregada",
          err,
        });
    res.json(result);
  });
});


//* REPORTES DE INDICADORES
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
router.get("/indicadores", async (req, res) => {
  const query = `
        SELECT IND.id_indicador,IND.nombre_indicador,UND.nom_unidad,
        LNBC.cantidad, LNB.cantidad_glb_identificada,met.cobertura_meta,
        (SELECT COUNT(PR.id_proyecto) FROM proyecto AS PR INNER JOIN alcance as ALC ON ALC.id_unidad_medicion = IND.id_unidad_medicion AND PR.id_proyecto = ALC.id_proyecto WHERE PR.id_indicador=IND.id_indicador) AS 'Acciones',
        ndc.nom_meta_ndc,pdes.nom_indicador_pdes,pprh.nom_indicador_pprh 
        FROM indicador AS IND
          INNER JOIN unidad_medicion AS UND ON IND.id_unidad_medicion = UND.id_unidad_medicion
          LEFT JOIN ndc ON ndc.id_ndc = IND.id_ndc
          LEFT JOIN pdes ON pdes.id_pdes = IND.id_pdes
          LEFT JOIN pprh ON pprh.id_pprh = IND.id_pprh
          LEFT JOIN linea_base_cobertura AS LNBC ON LNBC.id_indicador = IND.id_indicador
          LEFT JOIN linea_base AS LNB ON LNB.id_linea_base = LNBC.id_linea_base
          LEFT JOIN metas AS met ON met.id_indicador = IND.id_indicador
          GROUP BY IND.id_indicador;
          `;
  const queryInd = `
    SELECT PROY.id_proyecto,
    PROY.nom_proyecto,
    ETA.id_etapa,
    ETA.nombre_etapa,
    ETA.peso_etapa,
    SEGF.avance_seguimiento_fisico,
    ALC.cantidad,
    PROY.id_tipologia 
    FROM indicador AS IND
    INNER JOIN proyecto AS PROY ON PROY.id_indicador = IND.id_indicador
    INNER JOIN alcance as ALC ON PROY.id_proyecto = ALC.id_proyecto AND IND.id_unidad_medicion = ALC.id_unidad_medicion
    LEFT JOIN etapa_proyecto AS ETAP ON ETAP.id_proyecto = PROY.id_proyecto
    LEFT JOIN etapa AS ETA ON ETA.id_etapa = ETAP.id_etapa
    LEFT JOIN seguimiento_fisico AS SEGF ON SEGF.id_etapa_proyecto = ETAP.id_etapa_proyecto
    WHERE IND.id_indicador = ?;`;
  const queryPeso = `
  	SELECT SUM(ETA.peso_etapa) AS pesos_anteriores FROM etapa AS ETA
		WHERE ETA.id_tipologia = ?	 AND ETA.id_etapa < ?`;
  try {
    const reportes = [];
    const result = await onlySelect(query);
    for (const report_result of result) {
      const report = {
        COD: report_result.id_indicador,
        nombre_indicador: report_result?.nombre_indicador || "",
        uni_ind: report_result?.nom_unidad || "",
        LB_2020: 0,
        Meta_2025: report_result?.cobertura_meta || 0,
        "%_ind_efectivo": 0,
        "#Acciones": report_result?.Acciones || 0,
        NDC: report_result?.nom_meta_ndc || "",
        PDES: report_result?.nom_indicador_pdes || "",
        PPRH: report_result?.nom_indicador_pprh || "",
      };

      let total = 0;
      const result2 = await selectParams(queryInd, [
        report_result.id_indicador,
      ]);
      if (result2.length > 0) {
        const data = [];
        for (const {
          id_proyecto,
          nom_proyecto,
          id_tipologia,
          peso_etapa,
          cantidad,
          id_etapa,
          nombre_etapa,
          avance_seguimiento_fisico,
        } of result2) {
          if (data.length === 0) {
            if (id_etapa) {
              data.push({
                id_proyecto,
                nom_proyecto,
                id_tipologia,
                cantidad: cantidad || 0,
                pesos_anteriores: 0,
                ultima_etapa: {
                  id_etapa,
                  nombre_etapa,
                  avance_etapa: avance_seguimiento_fisico || 0,
                  peso_etapa,
                },
              });
            } else {
              data.push({
                id_proyecto,
                nom_proyecto,
                id_tipologia,
                cantidad: cantidad || 0,
                pesos_anteriores: 0,
                ultima_etapa: null,
              });
            }
          } else {
            const row = data.find((val) => val.id_proyecto === id_proyecto);
            // console.log('hay mas etapas:',row);
            if (row) {
              if (typeof id_etapa === "number") {
                //console.log(row);
                if (row.ultima_etapa) {
                  if (row.ultima_etapa?.id_etapa === id_etapa) {
                    row.ultima_etapa.avance_etapa =
                      avance_seguimiento_fisico > row.ultima_etapa.avance_etapa
                        ? avance_seguimiento_fisico
                        : row.ultima_etapa.avance_etapa;
                  } else if (id_etapa > row.ultima_etapa?.id_etapa) {
                    row.ultima_etapa = {
                      id_etapa,
                      nombre_etapa,
                      avance_etapa: avance_seguimiento_fisico,
                      peso_etapa,
                    };
                  }
                } else {
                  row.ultima_etapa = {
                    id_etapa,
                    nombre_etapa,
                    avance_etapa: avance_seguimiento_fisico || 0,
                    peso_etapa,
                  };
                }
              }
            } else {
              if (id_etapa) {
                data.push({
                  id_proyecto,
                  id_tipologia,
                  nom_proyecto,
                  cantidad: cantidad || 0,
                  pesos_anteriores: 0,
                  ultima_etapa: {
                    id_etapa,
                    nombre_etapa,
                    avance_etapa: avance_seguimiento_fisico || 0,
                    peso_etapa,
                  },
                });
              } else {
                data.push({
                  id_proyecto,
                  id_tipologia,
                  nom_proyecto,
                  cantidad: cantidad || 0,
                  pesos_anteriores: 0,
                  ultima_etapa: null,
                });
              }
            }
          }
          //console.log(data);
        }
        for (const proy of data) {
          if (proy.ultima_etapa) {
            const result = await selectParams(queryPeso, [
              proy.id_tipologia,
              proy.ultima_etapa.id_etapa,
            ]);
            proy.pesos_anteriores = result[0].pesos_anteriores || 0;
          }
        }

        for (const proy of data) {
          if (proy.ultima_etapa) {
            console.log('indicador: ', report.nombre_indicador);
            console.log(report.uni_ind);
            console.log('proyecto: ', proy);
            const peso_etapa_actual =
              (proy.ultima_etapa.avance_etapa * proy.ultima_etapa.peso_etapa) /
              100;

            let pes =
              peso_etapa_actual + Number.parseInt(proy.pesos_anteriores);
            let cantidad = proy.cantidad;
            console.log('cantidad:', cantidad);
            //console.log('%',(cantidad*pes/100));
            console.log("cantidad medida:", (cantidad * pes) / 100);
            total += (cantidad * pes) / 100;
            //indice = indice+(cantidad*pes/100);
          }
        }
      }
      // console.log('cantidad total:',total);
      let formula = 0;
      let formula_Porc = 0;
      let linea_base_Porc = 0;
      report.LB_2020 = report_result.cantidad;

      switch (report.uni_ind) {
        case '%':
          if (report.COD === 14) {
            // linea_base_Porc= (report_result.cantidad*100)/report.Meta_2025;
            formula = (total) / report_result.cantidad;
            formula_Porc = 100 * (total / report_result.cantidad) / (report.Meta_2025 / 100);
            if (report["#Acciones"] > 0) {
              report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
            }
          } else {
            linea_base_Porc = (100 * report_result.cantidad / report_result.cantidad_glb_identificada).toFixed(2);
            report.LB_2020 = linea_base_Porc;
            formula = (report_result.cantidad + total) / report_result.cantidad_glb_identificada;
            formula_Porc = 100 * (formula - linea_base_Porc) / (report.Meta_2025 - linea_base_Porc);
            if (report["#Acciones"] > 0) {
              report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
            }
          }
          //report.
          break;
        case 'PTAR':
          //linea_base_Porc= (report_result.cantidad*100)/report.Meta_2025;

          console.log('es ptar', total);
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          console.log('es PTAR formula', formula_Porc);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'ha':
          if (report.COD === 12) {
            formula = total;
            formula_Porc = 100 * (total - report_result.cantidad) / (report.Meta_2025 - report_result.cantidad);
            if (report["#Acciones"] > 0) {
              report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc : 0;
            }
          } else if (report.COD === 13 || report.COD === 16) {
            formula = total + report_result.cantidad;
            formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
            if (report["#Acciones"] > 0) {
              report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
            }
          } else {
            formula = total;
            formula_Porc = 100 * (report_result.cantidad + total) / report.Meta_2025;
            if (report["#Acciones"] > 0) {
              report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
            }
          }
          break;
        case 'Industrias':
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'tm/ha':
          formula = total;
          formula_Porc = 100 * (total - report_result.cantidad) / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'APP':
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'GAM':
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'hm3':
          formula = total;
          formula_Porc = 100 * (total - report_result.cantidad) / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'proyectos':
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'ICA':
          formula = total;
          formula_Porc = 100 * total / report.Meta_2025;
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'Informes':
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'm':
          formula = total;
          formula_Porc = 100 * (total - report_result.cantidad) / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'normas_instrumentos':
          formula = total;
          formula_Porc = 100 * total / (report.Meta_2025 - report_result.cantidad);
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'IGH':
          formula = total;
          formula_Porc = 100 * total / report.Meta_2025;
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        case 'habitantes':
          formula = total;
          formula_Porc = 100 * total / report.Meta_2025;
          if (report["#Acciones"] > 0) {
            report['%_ind_efectivo'] = formula_Porc > 0 ? formula_Porc.toFixed(2) : 0;
          }
          break;
        default:
          console.log('indicador:', report.nombre_indicador);
          console.log('unidad: ', report.uni_ind);
          console.log('indicador no encontrado');
          break;
      }
      reportes.push(report);
    }
    //* RESPUESTA
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error, msg: "error al obtener datos" });
  }
});

router.get("/mapa", (req, res) => {
  const query = `SELECT
	p.id_proyecto, p.nom_proyecto AS nombre_proyecto,
    p.coordenada_x AS latitud,
    p.coordenada_y AS longitud,
    (SELECT e.nombre_etapa FROM etapa_proyecto ep
     INNER JOIN etapa e ON ep.id_etapa = e.id_etapa
     WHERE ep.id_proyecto = p.id_proyecto
     ORDER BY e.id_etapa DESC
     LIMIT 1) AS ultima_etapa,
    t.nom_tipologia AS tipologia
FROM proyecto p
INNER JOIN tipologia t ON p.id_tipologia = t.id_tipologia`;
  connection.query(query, (err, result) => {
    if (err)
      res.status(500).json({ msg: "error al consultar reportes mapa", err });
    res.json(result);
  });
});

//REPORTES INVERSION POR LINEA ESTRATEGICA
router.get("/inversion_le", (req, res) => {
  const query = `SELECT
  le.id_linea_estrategica,
  le.Inversion_meta_2025,
  le.descripcion AS linea_estrategica,
  COALESCE(SUM(f.costo_final), 0) AS inversion_total
FROM linea_estrategica le
LEFT JOIN linea_de_accion la ON le.id_linea_estrategica = la.id_linea_estrategica
LEFT JOIN accion_estrategica ae ON la.id_linea_accion = ae.id_linea_accion
LEFT JOIN proyecto p ON ae.id_accion_estrategica = p.id_accion_estrategica
LEFT JOIN etapa_proyecto ep ON p.id_proyecto = ep.id_proyecto
LEFT JOIN financiamiento f ON ep.id_etapa_proyecto = f.id_etapa_proyecto
GROUP BY le.id_linea_estrategica, le.descripcion`;
  connection.query(query, (err, result) => {
    if (err)
      res
        .status(500)
        .json({ msg: "error al consultar reporte por linea estratégica", err });
    res.json(result);
  });
});

//REPORTES INVERSION POR LINEA ESTRATEGICA DESAGREGADA POR MUNICIPIO
router.get("/inversion_desagregada_le", (req, res) => {
  const query = `SELECT
  le.id_linea_estrategica,
  le.descripcion AS linea_estrategica,
  SUM(CASE WHEN m.nombre_municipio = 'Tarija' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS Tarija,
  SUM(CASE WHEN m.nombre_municipio = 'San Lorenzo' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS "SanLorenzo",
  SUM(CASE WHEN m.nombre_municipio = 'Padcaya' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS Padcaya,
  SUM(CASE WHEN m.nombre_municipio = 'Uriondo' THEN COALESCE(f.costo_final, 0) ELSE 0 END) AS Uriondo,
  SUM(COALESCE(f.costo_final, 0)) AS inversion_total_linea
FROM
  linea_estrategica le
CROSS JOIN municipio m
LEFT JOIN proyecto p ON p.id_accion_estrategica IN (
  SELECT ae.id_accion_estrategica
  FROM accion_estrategica ae
  WHERE ae.id_linea_accion IN (
      SELECT la.id_linea_accion
      FROM linea_de_accion la
      WHERE la.id_linea_estrategica = le.id_linea_estrategica
  )
)
LEFT JOIN etapa_proyecto ep ON p.id_proyecto = ep.id_proyecto
LEFT JOIN financiamiento f ON ep.id_etapa_proyecto = f.id_etapa_proyecto
AND m.id_municipio IN (
  SELECT DISTINCT c.id_municipio
  FROM ciudad_o_comunidad c
  INNER JOIN proyecto_ciudad_o_comunidad pcc ON c.id = pcc.id_ciudad_comunidad
  WHERE pcc.id_proyecto = p.id_proyecto
)
GROUP BY le.id_linea_estrategica, le.descripcion
ORDER BY le.id_linea_estrategica;`;
  connection.query(query, (err, result) => {
    if (err)
      res
        .status(500)
        .json({
          msg: "error al consultar reportes inversión desagregada",
          err,
        });
    res.json(result);
  });
});

module.exports = router;
