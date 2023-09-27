const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//Listar etapa
router.get('/get', (req, res) => {
  connection.query('SELECT E.*, T.nom_tipologia, T.id_tipologia FROM etapa E INNER JOIN tipologia T ON E.id_tipologia = T.id_tipologia;', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al obtener las etapas' });
    } else {
      res.json(results);
    }
  });
});



//modificar
router.put('/update/', (req, res) => {
  const { nombre_etapa, descripcion_etapa, peso_etapa, estado, id_tipologia, id_etapa } = req.body;
  connection.query('UPDATE etapa SET nombre_etapa = ?, descripcion_etapa = ?, peso_etapa=?, estado = ?,id_tipologia=? WHERE id_etapa = ?', [nombre_etapa, descripcion_etapa, peso_etapa, estado, id_tipologia, id_etapa], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al actualizar la entidad ' });
    } else {
      res.json({ message: 'Entidad actualizada correctamente' });
    }
  });
});


//Status Etapa 
router.patch('/updateStatus', (req, res) => {
  let etapa = req.body;
  console.log(etapa);
  var query = "update etapa set estado=? where id_etapa=?";
  connection.query(query, [etapa.estado, etapa.id_etapa], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "La etapa no existe" });
      }
      return res.status(200).json({ message: "Actualización de estado con éxito" });
    }
    else {
      return res.status(500).json(err);
    }
  })
})





module.exports = router;