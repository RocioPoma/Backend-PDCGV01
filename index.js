const express = require('express');
var cors = require('cors');
const path = require('path');
const connection =require('./connection');

//rutas
const userRoute = require('./routes/usuario');
const MunicipioRoute = require('./routes/municipio');
const lineas_estr_Route = require('./routes/lineas_estrategicas');
const lineas_acc_Route = require('./routes/lineas_accion');
const acciones_est_Route = require('./routes/acciones_estrategicas');
const indicador_Route = require('./routes/Indicador');
const categoria_Route = require('./routes/Categoria');
const proyectos_Route = require('./routes/Proyectos');
const comunidad_Route=require('./routes/ciudad_o_comunidad');
const cuenca_Route=require('./routes/cuenca');
const unidad_Route=require('./routes/unidad_medicion');
const entidad_eje_Route = require('./routes/Entidad_Ejecutora');
const entidad_financiera_Route = require('./routes/Entidad_financiera');
const seguimiento_proyecto_Route=require('./routes/seguimiento_proyecto');
const entidad_Route=require('./routes/Entidad');
const fuente_informacion_Route=require('./routes/fuente_de_informacion');
const etapa_Route=require('./routes/Etapa');
const tipologia_Route=require('./routes/tipologia');
const reportes_Route=require('./routes/reportes');
const nosotros_Route=require('./routes/nosotros');


//const path = require('path');

const app = express();

//Middleware
app.use(cors({origin: '*'}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/api/test", (req, res) => {
  res.send("El Servidor Responde Bien");
});
// app.get("/", (req, res) => {
//   res.send("El Servidor Responde Bien");
// });

app.use('/uploads',express.static(path.resolve('uploads')));
//rutas componentes
app.use('/usuarios',userRoute);
app.use('/municipio',MunicipioRoute);
app.use('/lineas_estr',lineas_estr_Route);
app.use('/lineas_acc',lineas_acc_Route);
app.use('/accion_est',acciones_est_Route);
app.use('/indicador',indicador_Route);
app.use('/categoria',categoria_Route);
app.use('/proyecto',proyectos_Route);
app.use('/comunidad',comunidad_Route);
app.use('/cuenca',cuenca_Route);
app.use('/unidad',unidad_Route);
app.use('/entidad_eje',entidad_eje_Route);
app.use('/entidad_financiera',entidad_financiera_Route);
app.use('/seguimiento_proyecto',seguimiento_proyecto_Route);
app.use('/entidad',entidad_Route);
app.use('/fuente_informacion',fuente_informacion_Route);
app.use('/etapa',etapa_Route);
app.use('/tipologia',tipologia_Route);
app.use('/reportes',reportes_Route);
app.use('/nosotros',nosotros_Route);

module.exports=app;
