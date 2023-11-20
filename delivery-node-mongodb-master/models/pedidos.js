const { DynamoDB } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new DynamoDB();
const tableName = 'restaurantdb';

const Pedido = {
  create: function (nombre, apellido, callback) {
    const itemId = generateUniqueId();

    const params = {
      TableName: tableName,
      Item: {
        'id': { S: itemId }, // Cambiado a tipo String directamente
        'nombre': { S: nombre },
        'apellido': { S: apellido },
      },
    };

    dynamoDB.putItem(params, function (err, data) {
      if (err) {
        return callback(err);
      }
      callback(null, data);
    });
  },

  getAll: function (callback) {
    const params = {
      TableName: tableName,
    };

    dynamoDB.scan(params, function (err, data) {
      if (err) {
        return callback(err);
      }
      const pedidos = data.Items.map(item => {
        return {
          id: item.id.S, // Cambiado a tipo String directamente
          nombre: item.nombre.S,
          apellido: item.apellido.S,
        };
      });
      callback(null, pedidos);
    });
  },

  generateUniqueId: function () {
    return uuidv4();
  }
};

module.exports = Pedido;
