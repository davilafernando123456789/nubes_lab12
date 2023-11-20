const dbConnection = require('../db');
const connection = dbConnection.mysqlConnection;

const Contacto = {};

Contacto.getAll = function (callback) {
    connection.query('SELECT id, nombre, apellidos, correo, fecha_nac, foto FROM contactos', function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

Contacto.create = function (nuevoContacto, callback) {
    connection.query('INSERT INTO contactos SET ?', nuevoContacto, function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

Contacto.getById = function (contactoId, callback) {
    connection.query('SELECT id, nombre, apellidos, correo, fecha_nac, foto FROM contactos WHERE id = ?', [contactoId], function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

Contacto.updateById = function (contactoId, nuevosDatos, callback) {
    connection.query('UPDATE contactos SET ? WHERE id = ?', [nuevosDatos, contactoId], function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

Contacto.deleteById = function (contactoId, callback) {
    connection.query('DELETE FROM contactos WHERE id = ?', [contactoId], function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(null, results);
    });
};

// Cierra la conexión a la base de datos al finalizar la aplicación
process.on('exit', function () {
    connection.end();
});

module.exports = Contacto;
