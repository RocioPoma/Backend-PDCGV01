const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//Listar cuenca
router.get('/get', (req, res) => {
    connection.query('SELECT * FROM CUENCA', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Hubo un error al obtener cuenca' });
        } else {
            res.json(results);
        }
    });
});

//obtener cuenca con id

//crear cuenca

//modificar cuenca

//borrar cuenca

//status cuenca

module.exports = router;