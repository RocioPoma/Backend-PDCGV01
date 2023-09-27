const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
//TODO: DESUSO
// router.get("/fuentes", (req, res) => {
//   const query = `SELECT FN.nom_fuente_inf,FN.id_fuente_de_informacion FROM fuente_de_informacion AS FN;`;
//   connection.query(query, (err, result) => {
//     if (err) {
//       res.status(500).json({ msg: "error en el sistema", err });
//       throw new Error(err);
//     }
//     res.json(result);
//   });
// });

module.exports = router;
