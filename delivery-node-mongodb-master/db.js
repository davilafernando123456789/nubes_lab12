

const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'mysql.cwol9io3cymq.us-east-2.rds.amazonaws.com', 
    user: process.env.MYSQL_USER || 'admin', 
    password: process.env.MYSQL_PASSWORD || 'Fernadb76', 
    database: process.env.MYSQL_DATABASE || 'semana12', 
    // host: process.env.MYSQL_HOST || 'localhost', 
    // user: process.env.MYSQL_USER || 'root', 
    // password: process.env.MYSQL_PASSWORD || '', 
    // database: process.env.MYSQL_DATABASE || 'semana12', 

});


mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
        return;
    }
    console.log('Conexión a MySQL exitosa');
});

mysqlConnection.on('error', (err) => {
    console.error('Error en la conexión MySQL:', err);
});


module.exports = {
    mysqlConnection: mysqlConnection,
};
