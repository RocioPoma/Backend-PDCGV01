const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');


//listar
router.get('/get', (req, res) => {
    connection.query('SELECT * FROM entidad_ejecutora', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener las entidades ejecutoras' });
      } else {
        res.json(results);
      }
    });
  });
//buscar
router.get('/buscar/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM entidad_ejecutora WHERE id_entidad_ejecutora = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener la entidad ejecutora' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Entidad ejecutora no encontrada' });
        } else {
          res.json(results[0]);
        }
      }
    });
  });
//crear
router.post('/create', (req, res) => {
    const { id_entidad_ejecutora, nom_entidad_ejecutora, desc_entidad_ejecutora, estado } = req.body;
    console.log(req.body);
    connection.query('INSERT INTO entidad_ejecutora (id_entidad_ejecutora, nom_entidad_ejecutora, desc_entidad_ejecutora, estado) VALUES (?, ?, ?, ?)', [id_entidad_ejecutora, nom_entidad_ejecutora, desc_entidad_ejecutora, estado], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al crear la entidad ejecutora' });
      } else {
        res.json({ message: 'Entidad ejecutora fue creada correctamente' });
      }
    });
  });
//modificar
router.put('/update/', (req, res) => {   
    const { nom_entidad_ejecutora, desc_entidad_ejecutora, estado ,id_entidad_ejecutora} = req.body;
    connection.query('UPDATE entidad_ejecutora SET nom_entidad_ejecutora = ?, desc_entidad_ejecutora = ?, estado = ? WHERE id_entidad_ejecutora = ?', [nom_entidad_ejecutora, desc_entidad_ejecutora, estado, id_entidad_ejecutora], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al actualizar la entidad ejecutora' });
      } else {
        res.json({ message: 'Entidad ejecutora actualizada correctamente' });
      }
    });
  });
//eliminar
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM entidad_ejecutora WHERE id_entidad_ejecutora = ?', [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al eliminar la entidad ejecutora' });
      } else {
        res.json({ message: 'Entidad ejecutora eliminada correctamente' });
      }
    });
  });


  //status
//status entidad ejecutora
router.patch('/updateStatus',(req,res)=>{
  let user =req.body;
  console.log(user);
  var query = "update entidad_ejecutora set estado=? where id_entidad_ejecutora=?";
  connection.query(query,[user.estado,user.id_entidad_ejecutora],(err,results)=>{
      if(!err){
          if(results.affectedRows == 0){
              return res.status(404).json({message:"La entidad ejecutora no existe"});
          }
          return res.status(200).json({message:"Actualización Estado de estado fue un éxito"});
      }
      else{
          return res.status(500).json(err);
      }
  })
})
module.exports = router;