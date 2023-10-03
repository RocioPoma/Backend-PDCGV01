const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//Listar ciudad_comunidad
router.get('/get', (req, res) => {
    connection.query(`
    SELECT cc.*, m.nombre_municipio 
    FROM ciudad_o_comunidad cc 
    JOIN municipio m ON cc.id_municipio = m.id_municipio
    ORDER BY cc.nombre ASC;
     `,
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Hubo un error al obtener CIUDAD_O_COMUNIDAD' });
            } else {
                res.json(results);
            }
        });
});

//obtener ciudad_comunidad por id de municipio
router.get('/getByIdMunicipio/:id_municipio', (req, res) => {
    const id_municipio = req.params.id_municipio;
    var query =  `SELECT cc.* 
    FROM ciudad_o_comunidad AS cc 
    WHERE id_municipio=?
    ORDER BY cc.nombre ASC; `;
    connection.query(query, [id_municipio], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Hubo un error al obtener Ciudad/comunidad por id de municipio' })
        } else {
            res.json(results);
        }
    });
})

//crear ciudad_comunidad
router.post('/create', (req, res) => {
    const { nombre, id_municipio } = req.body;
    console.log(req.body);
    connection.query('INSERT INTO ciudad_o_comunidad (nombre, id_municipio) VALUES ( ?, ?)', [nombre, id_municipio], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Hubo un error al crear la comunidad ' });
        } else {
            res.json({ message: 'Comunidad/Ciudad creada con exito' });
        }
    });
});

//modificar ciudad_comunidad
router.patch('/update', (req, res) => {
    let comunidad = req.body;
    connection.query('UPDATE ciudad_o_comunidad SET nombre = ?, id_municipio = ? WHERE id = ?', [comunidad.nombre, comunidad.id_municipio, comunidad.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Hubo un error al actualizar la ciudad ' });
        } else {
            res.json({ message: 'La actualización se realizo con éxito' });
        }
    });
});

//borrar ciudad_comunidad
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    connection.query('DELETE FROM ciudad_o_comunidad WHERE id=?', [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'No se puede eliminar debido a que se esta utilizando en proyectos' });
        }
        else {
            res.json({ message: 'Comunidad eliminada correctamente' });
        }
    });
});

//status ciudad_comunidad
router.patch('/updateStatus', (req, res) => {
    let comunidad = req.body;
    console.log(comunidad);
    var query = "UPDATE CIUDAD_O_COMUNIDAD SET ESTADO=? WHERE id=?";
    connection.query(query, [comunidad.estado, comunidad.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "La comunidad no existe" });
            }
            return res.status(200).json({ message: "Actualización de estado con éxito" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
