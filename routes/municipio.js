const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

//Listar municipio
router.get('/get', (req, res) => {
    connection.query('SELECT * FROM MUNICIPIO', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener los municipios' });
      } else {
        res.json(results);
      }
    });
  });

  //obtener municipio con id
  router.get('/municipios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM MUNICIPIO WHERE id_municipio = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener el municipio' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Municipio no encontrado' });
        } else {
          res.json(results[0]);
        }
      }
    });
  });

  //crear municipio
  router.post('/create', (req, res) => {
    const { nombre_municipio, estado } = req.body;
    connection.query('INSERT INTO MUNICIPIO (nombre_municipio, estado) VALUES (?, ?)', [nombre_municipio, estado], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al crear el municipio' });
      } else {
        res.json({ id: results.insertId, nombre_municipio, estado });
      }
    });
  });

//modificar municipio
   router.patch('/update', (req, res) => {
    let municipio = req.body;
    //console.log(municipio);
    connection.query('UPDATE MUNICIPIO SET nombre_municipio = ?, estado = ? WHERE id_municipio = ?', [municipio.nombre_municipio, municipio.estado, municipio.id_municipio], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al actualizar el municipio' });
      } else {
        res.json({ message: 'Municipio actualizado correctamente' });
      }
    });
  }); 
//borrar municipio
  router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM MUNICIPIO WHERE id_municipio = ?', [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al eliminar el municipio' });
      } else {
        res.json({ message: 'Municipio eliminado correctamente' });
      }
    });
  });

//estado municipio activar o desactivar
router.patch('/updateStatus',(req,res)=>{
  let municipio =req.body;
  var query = "update municipio set estado=? where id_municipio=?";
  connection.query(query,[municipio.estado,municipio.id_municipio],(err,results)=>{
      if(!err){
          if(results.affectedRows == 0){
              return res.status(404).json({message:"El municipio  no existe"});
          }
          return res.status(200).json({message:"Actualización Estado de municipio con éxito"});
      }
      else{
          return res.status(500).json(err);
      }
  })
})

module.exports = router;