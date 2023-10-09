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
      if (err) {
        console.log(err);
        
      res.status(500).json({message:'error al obtener nosotros'});
      };
      res.json(result);
    });
  });

//--------------------------------------router

router.post('/add', multer.fields([
  { name: 'files1', maxCount: 1 },
  { name: 'files2', maxCount: 1 },
  { name: 'files3', maxCount: 1 },
  { name: 'files4', maxCount: 1 },
  { name: 'files5', maxCount: 1 }
]), (req, res) => {
  // Accede a los archivos cargados desde Angular
  const files1 = req.files['files1'][0]; // Si estás seguro de que siempre habrá un archivo
  const files2 = req.files['files2'][0];
  const files3 = req.files['files3'][0];
  const files4 = req.files['files4'][0];
  const files5 = req.files['files5'][0];


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

if (!files5 || !files5.size) {
  console.log(files5.filename);
}


  // Accede a otros datos del formulario
  let id = req.body.id;
  let descripcion = req.body.descripcion;
  let link_video = req.body.link_video;

  console.log(id,descripcion,link_video);
 /*  console.log(files1.filename);
  console.log(files2.filename);
  console.log(files3.filename);
  console.log(files4.filename); */


      descripcion= descripcion;
      link_video= link_video; 
   
   
      // Agregar los archivos a los nuevos datos solo si no están vacíos
if (files1 && files1.size) {
  documento_general = files1.filename;
}
if (files2 && files2.size) {
 manual_usuario = files2.filename;
}
if (files3 && files3.size) {
  manual_desarrollo = files3.filename;
}
if (files4 && files4.size) {
  ieee_830 = files4.filename;
}
if (files5 && files5.size) {
 documento_sistema = files5.filename;
}

      const sql = `
      INSERT INTO nosotros 
      (descripcion, link_video, documento_general, manual_usuario, manual_desarrollo, eee_830, documento_sistema) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(sql, [descripcion, link_video, documento_general, manual_usuario, manual_desarrollo, ieee_830, documento_sistema], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Hubo un error al añadir' });
        } else {
          res.json(results);
        }
      });
}); 



//--------------------------------------------------------



  // Ruta para recibir la solicitud PUT de Angular
router.put('/update', multer.fields([
    { name: 'files1', maxCount: 1 },
    { name: 'files2', maxCount: 1 },
    { name: 'files3', maxCount: 1 },
    { name: 'files4', maxCount: 1 },
    { name: 'files5', maxCount: 1 }
  ]), (req, res) => {
    // Accede a los archivos cargados desde Angular
    const files1 = req.files['files1'][0]; // Si estás seguro de que siempre habrá un archivo
    const files2 = req.files['files2'][0];
    const files3 = req.files['files3'][0];
    const files4 = req.files['files4'][0];
    const files5 = req.files['files5'][0];


     // Verificar si los archivos son nulos o vacíos y cuál de ellos es el que está vacío
  if (!files1 || !files1.size) {
   // console.log(files1.filename);
    // Puedes enviar una respuesta al cliente Angular indicando que el archivo 1 está vacío
  }


  if (!files2 || !files2.size) {
    //console.log(files2.filename);
  
  }
  if (!files3 || !files3.size) {
    //console.log(files3.filename);    
  }

  if (!files4 || !files4.size) {
    //console.log(files4.filename);
  }

  if (!files5 || !files5.size) {
   // console.log(files5.filename);
  }

  
    // Accede a otros datos del formulario
    const id = req.body.id;
    const descripcion = req.body.descripcion;
    const link_video = req.body.link_video;
 


    console.log(id,descripcion,link_video);
    console.log(req.body.files6);
    console.log(req.body.files7);
    console.log(req.body.files8);
    console.log(req.body.files9);
    console.log(req.body.files10);
    

     const nuevosDatos = {
        descripcion: descripcion,
        link_video: link_video 
      };
     
        // Agregar los archivos a los nuevos datos solo si no están vacíos
  if (files1 && files1.size) {
    nuevosDatos.documento_general = files1.filename;
  }/* else{
    nuevosDatos.documento_general = req.body.files6 
  }*/
  if (files2 && files2.size) {
    nuevosDatos.manual_usuario = files2.filename;
  }/* else{ nuevosDatos.manual_usuario= req.body.files7} */
  
  if (files3 && files3.size) {
    nuevosDatos.manual_desarrollo = files3.filename;
  }/* else{ nuevosDatos.manual_desarrollo = req.body.files8} */

  if (files4 && files4.size) {
    nuevosDatos.eee_830 = files4.filename;
  }/* else{ nuevosDatos.eee_830 = req.body.files9} */

  if (files5 && files5.size) {
    nuevosDatos.documento_sistema = files5.filename;
  }/* else{ nuevosDatos.documento_sistema = req.body.files10} */

  console.log(nuevosDatos);
     const queryDocumento = `
    UPDATE nosotros
    SET ?
    WHERE id_nosotros = ?
    `;
    connection.query(queryDocumento, [nuevosDatos, id],(err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al actulizar' });
      } else {
        res.json({ message: 'Archivos actualizados correctamente' });
      }
    });  
  }); 


  module.exports = router;