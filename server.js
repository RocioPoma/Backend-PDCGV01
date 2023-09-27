require('dotenv').config();
/* const http = require('http'); */
const app = require('./index');
const server =http.createServer(app);
server.listen(80, () => {
  console.log("FUNCIONA")
});
