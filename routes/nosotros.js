const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
const path = require('path');
//----------para archivos-----------------------------------------------------------------------------
multer = require('../libs/multer');
const fs = require('fs');


//Status documentos 
router.get('/listar', (req, res) => {    
    const sql = `  
    SELECT d.*
    FROM nosotros d
   `;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  // Ruta para recibir la solicitud PUT de Angular
router.put('/update', multer.fields([
    { name: 'files1', maxCount: 1 },
    { name: 'files2', maxCount: 1 },
    { name: 'files3', maxCount: 1 },
    { name: 'files4', maxCount: 1 }
  ]), (req, res) => {
    // Accede a los archivos cargados desde Angular
    const files1 = req.files['files1'][0]; // Si estás seguro de que siempre habrá un archivo
    const files2 = req.files['files2'][0];
    const files3 = req.files['files3'][0];
    const files4 = req.files['files4'][0];


     // Verificar si los archivos son nulos o vacíos y cuál de ellos es el que está vacío
  if (!files1 || !files1.size) {
    console.log(files1.filename);
    // Puedes enviar una respuesta al cliente Angular indicando que el archivo 1 está vacío
  
  }
  if (!files2 || !files2.size) {
    console.log(files2.filename);
  
  }
  if (!files3 || !files3.size) {
    console.log(files3.filename);    
  }

  if (!files4 || !files4.size) {
    console.log(files4.filename);
  }

  
    // Accede a otros datos del formulario
    const id = req.body.id;
    const descripcion = req.body.descripcion;
    const link_video = req.body.link_video;

    console.log(id,descripcion,link_video);
   /*  console.log(files1.filename);
    console.log(files2.filename);
    console.log(files3.filename);
    console.log(files4.filename); */

     const nuevosDatos = {
        descripcion: descripcion,
        link_video: link_video 
      };
     
        // Agregar los archivos a los nuevos datos solo si no están vacíos
  if (files1 && files1.size) {
    nuevosDatos.documento_general = files1.filename;
  }
  if (files2 && files2.size) {
    nuevosDatos.manual_usuario = files2.filename;
  }
  if (files3 && files3.size) {
    nuevosDatos.manual_desarrollo = files3.filename;
  }
  if (files4 && files4.size) {
    nuevosDatos.ieee_830 = files4.filename;
  }

    const queryDocumento = `
    UPDATE nosotros
    SET ?
    WHERE id = ?
    `;
    connection.query(queryDocumento, [nuevosDatos, id],(err, result) => {
         if (err) {
           res.status(500).json({ msg: "erro al insertar documentos" });
           throw new Error(`error al isertar: ${err}`);
         }
       }
     );    
    // Envía una respuesta al cliente Angular
    res.status(200).send('Datos recibidos y procesados correctamente');
  }); 


  module.exports = router;