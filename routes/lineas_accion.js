const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//list 
router.get('/get', (req, res) => {
  connection.query('SELECT * FROM LINEA_DE_ACCION', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al obtener los LINEAS_ESTRATEGICAS' });
    } else {
      res.json(results);
    }
  });
});

//obtener LineaDeAccion por id de AccionEstratégica
router.get('/getByIdLineaEstrategica/:id_linea_estrategica', (req, res) => {
  const id_linea_estrategica = req.params.id_linea_estrategica;
  var query = 'SELECT LA.* FROM LINEA_DE_ACCION LA WHERE id_linea_estrategica=?';
  connection.query(query, [id_linea_estrategica], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al obtener Linea De Acción' })
    } else {
      res.json(results);
    }
  });
})

//editar
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  connection.query('UPDATE LINEA_DE_ACCION SET descripcion = ? WHERE id_linea_accion = ?', [descripcion, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al editar la línea de acción' });
    } else {
      res.json({ message: 'Línea de acción actualizada correctamente' });
    }
  });
});


//habilitar y deshabilitar
//Habilitar una línea de acción por ID
router.put('/activa/:id', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE LINEA_DE_ACCION SET estado = 1 WHERE id_linea_accion = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al habilitar la línea de acción' });
    } else {
      res.json({ message: 'Línea de acción habilitada correctamente' });
    }
  });
});

// Deshabilitar una línea de acción por ID
router.put('/desactiva/:id', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE LINEA_DE_ACCION SET estado = 0 WHERE id_linea_accion = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al deshabilitar la línea de acción' });
    } else {
      res.json({ message: 'Línea de acción deshabilitada correctamente' });
    }
  });
});


module.exports = router;