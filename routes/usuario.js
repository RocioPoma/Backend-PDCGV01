const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
var auth = require('../services/authentication');

// Obtener todos los usuarios
router.get('/list',auth.authenticateToken,(req, res) => {
    connection.query("SELECT e.nom_entidad_ejecutora,u.*, DATE_FORMAT(u.fecha_registro, '%d-%m-%Y') AS fecha_registro_convert FROM usuario u, entidad_ejecutora e where e.id_entidad_ejecutora = u.id_entidad_ejecutora ", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios' });
      } else {
        res.json(results);
      }
    });
  });

//obtener usuario sergun ci
router.get('/buscar/:ci',auth.authenticateToken, (req, res) => {
    const { ci } = req.params;
    connection.query('SELECT * FROM USUARIO WHERE ci = ?', [ci], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al obtener el usuario' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
          res.json(results[0]);
        }
      }
    });
  });

//crear usuario
router.post('/create/',auth.authenticateToken, (req, res) => {
  console.log(req.body);
     const { ci, nombre, ap_paterno, ap_materno, password, email, telefono, genero, rol, estado, id_entidad_ejecutora,celular,fecha_registro } = req.body;
   
    //nuevo 
    // Antes de realizar la inserción, verifica si el email ya está en uso.
connection.query('SELECT * FROM USUARIO WHERE email = ?', [email], (err, results) => {
  if (!err) {
    if (results.length > 0) {
      // Ya existe un usuario con el mismo email, devuelve un mensaje de error.
      return res.status(400).json({ message: "El email ya está en uso." });
    } else {
      // El email es único, ahora verifica si el ci es único.
      connection.query('SELECT * FROM USUARIO WHERE ci = ?', [ci], (err, results) => {
        if (!err) {
          if (results.length > 0) {
            // Ya existe un usuario con el mismo ci, devuelve un mensaje de error.
            return res.status(400).json({ message: "El número de cédula ya está en uso." });
          } else {
            // El email y el ci son únicos, procede con la inserción.
            // ... Tu código de inserción aquí ...
            //------------------------------------------------------------------------------------------------
            connection.query('INSERT INTO USUARIO (ci, nombre, ap_paterno, ap_materno, password, email, telefono, genero, rol, estado, id_entidad_ejecutora,celular,fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ci, nombre, ap_paterno, ap_materno, password, email, telefono, genero, rol, estado,id_entidad_ejecutora,celular,fecha_registro ], (err, results) => {
              if (!err) {
                return res.status(200).json({ message: "Usuario agregado con exito" });
              }
              else {
                return res.status(500).json(err);
              }
            }); 
            //------------------------------------------------------------------------------------------------
          }
        } else {
          return res.status(500).json(err);
        }
      });
    }
  } else {
    return res.status(500).json(err);
  }
});
  });

//actualizar usuario
router.put('/update/', auth.authenticateToken,(req, res) => {
    
    const {ci, nombre, ap_paterno, ap_materno, password, email, telefono, genero, rol, estado, id_entidad_ejecutora,celular,fecha_registro } = req.body;
    connection.query('UPDATE USUARIO SET nombre = ?, ap_paterno = ?, ap_materno = ?, password = ?, email = ?, telefono = ?, genero = ?, rol = ?, estado = ?, id_entidad_ejecutora = ?,celular = ?,fecha_registro= ? WHERE ci = ?', [nombre, ap_paterno, ap_materno, password, email, telefono, genero, rol, estado,id_entidad_ejecutora,celular,fecha_registro, ci], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario' });
      } else {
        res.json({ message: 'Usuario actualizado correctamente' });
      }
    });
  });

//eliminar usuario
router.delete('/delete/:ci',auth.authenticateToken, (req, res) => {
    const { ci } = req.params;
    connection.query('DELETE FROM USUARIO WHERE ci = ?', [ci], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
      } else {
        res.json({ message: 'Usuario eliminado correctamente' });
      }
    });
  });




 /*  router.post('/signup',(req,res)=>{
    let user= req.body;
    query ="select email,password,role,status from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0){
                query="insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contactNumber,user.email,user.password],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Registro Exitoso"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }   
            else{
                return res.status(400).json({message: "Alguien se encuentra registrado con el mismo correo"});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })

}) falta*/  

//---------------- LOGIN ------------------------
router.post('/login',(req,res)=>{
    const user =req.body;
    query = "select nombre,ap_paterno, ap_materno,email,password,rol,estado,ci from usuario where email=?";
  
    connection.query(query,[user.email],(err,results)=>{
      console.log(results);
        if(!err){
            if(results.length <= 0 || results[0].password != user.password){
                return res.status(401).json({message:"Nombre de usuario o contraseña incorrecta"});
            }
            else if(results[0].estado==='false'){
                return res.status(401).json({message:"Esperar la aprobación del administrador"});   
            } 
            else if(results[0].password==user.password){
                //GUARDAMOS CIFRADO LA CONTRASENA
                const data = { nombre: results[0].nombre, estado: results[0].estado,rol: results[0].rol,ap_paterno: results[0].ap_paterno,ap_materno: results[0].ap_materno,ci: results[0].ci };               
                const response ={ email: results[0].email, rol: results[0].rol}
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN,{ expiresIn: '8h'})
                res.status(200).json({ token: accessToken, data:data});
            }
            else{
                return res.status(400).json({message:"Algo salió mal. Por favor, inténtelo de nuevo más tarde"});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//status user
router.patch('/updateStatus',(req,res)=>{
  let user =req.body;
  console.log(user);
  var query = "update usuario set estado=? where ci=?";
  connection.query(query,[user.estado,user.ci],(err,results)=>{
      if(!err){
          if(results.affectedRows == 0){
              return res.status(404).json({message:"El usuario  no existe"});
          }
          return res.status(200).json({message:"Actualización Estado de usuario con éxito"});
      }
      else{
          return res.status(500).json(err);
      }
  })
})


module.exports = router;