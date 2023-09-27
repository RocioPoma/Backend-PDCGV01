const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

// Ruta para obtener todas las categorías
router.get('/get', (req, res) => {
  const sql = 'SELECT * FROM tipologia';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});



// Exporta el enrutador
module.exports = router;


