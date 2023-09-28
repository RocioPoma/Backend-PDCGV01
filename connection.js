const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
/*     port: 18005, */
    host: 'cln27ipjx00p2pmcgsh59jsof',
    user: 'cln27ipjv0c0jcgpmdch2a2m3',
    password: 'W3oeWdjYgm80ncdCpyUrk1vH',
    database: 'bdd_proyectos_v03'
});

connection.connect((err)=>{
    if(!err){
        console.log("CONNECTED");
    }
    else{
        console.log('ERROR: ');
        console.log(err);
    }
})

module.exports = connection;
