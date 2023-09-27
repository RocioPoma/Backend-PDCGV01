const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//Listar unidad de medicion
router.get('/get', (req, res) => {
    connection.query('SELECT * FROM UNIDAD_MEDICION', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Hubo un error al obtener unidad de medición' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;