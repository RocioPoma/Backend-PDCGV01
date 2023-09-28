const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

// Ruta para obtener todas las categorías
router.get('/get', (req, res) => {
  const sql = 'SELECT * FROM categoria';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Ruta para obtener una categoría por su ID
router.get('/buscar/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM categoria WHERE id_categoria = ?';
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Ruta para crear una nueva categoría
router.post('/create', (req, res) => {
  const { nom_categoria, desc_categoria, estado } = req.body;
  const sql = 'INSERT INTO categoria (nom_categoria, desc_categoria, estado) VALUES (?, ?, ?)';
  connection.query(sql, [nom_categoria, desc_categoria, estado], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Categoría creada correctamente' });
  });
});

// Ruta para actualizar una categoría
router.patch('/update', (req, res) => {
  let categoria = req.body;
  var query = "UPDATE CATEGORIA SET nom_categoria = ?, desc_categoria = ? WHERE id_categoria = ?";
  connection.query(query, [categoria.nom_categoria, categoria.desc_categoria, categoria.id_categoria], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Categoría actualizada correctamente' });
  });
});

// Ruta para habilitar o deshabilitar una categoría
router.patch('/updateStatus',(req,res)=>{
  let categoria =req.body;
  var query = "update categoria set estado=? where id_categoria=?";
  connection.query(query,[categoria.estado,categoria.id_categoria],(err,results)=>{
      if(!err){
          if(results.affectedRows == 0){
              return res.status(404).json({message:"La categoria no existe"});
          }
          return res.status(200).json({message:"Actualización Estado de categoría con éxito"});
      }
      else{
          return res.status(500).json(err);
      }
  })
})

// Ruta para eliminar una categoría
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Categoría eliminada correctamente' });
  });
});

// Exporta el enrutador
module.exports = router;


