const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//list 
router.get('/get', (req, res) => {
    connection.query('SELECT * FROM linea_estrategica', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener los LINEAS_ESTRATEGICAS' });
      } else {
        res.json(results);
      }
    });
  });

//editar
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    connection.query('UPDATE linea_estrategica SET descripcion = ? WHERE id_linea_estrategica = ?', [descripcion, id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al editar la línea estratégica' });
      } else {
        res.json({ message: 'Línea estratégica actualizada correctamente' });
      }
    });
  });

//  Habilitar o deshabilitar una línea estratégica por ID:
// Habilitar una línea estratégica por ID
router.put('/habilitar/:id', (req, res) => {
    const { id } = req.params;
    connection.query('UPDATE linea_estrategica SET estado = 1 WHERE id_linea_estrategica = ?', [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al habilitar la línea estratégica' });
      } else {
        res.json({ message: 'Línea estratégica habilitada correctamente' });
      }
    });
  });
  
  // Deshabilitar una línea estratégica por ID
  router.put('/deshabilitar/:id', (req, res) => {
    const { id } = req.params;
    connection.query('UPDATE linea_estrategica SET estado = 0 WHERE id_linea_estrategica = ?', [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al deshabilitar la línea estratégica' });
      } else {
        res.json({ message: 'Línea estratégica deshabilitada correctamente' });
      }
    });
  });


module.exports = router;