const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const dbsynamo = require('./dbdynamo');
const pedidosRoutes = require('./routes/pedidos'); // Cambiado el nombre de la variable
const contactosRoutes = require('./routes/contactos'); // Cambiado el nombre de la variable

const path = __dirname + '/views/';
const port = 8080;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.use('/pedidos', pedidosRoutes); // Cambiado el nombre de la variable
app.use('/contactos', contactosRoutes); // Cambiado el nombre de la variable
app.use(express.urlencoded({ extended: true }));
app.listen(port, function () {
  console.log('Example app listening on port 8080!')
});


