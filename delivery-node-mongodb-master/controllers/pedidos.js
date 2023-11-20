const path = require('path');
const AWS = require('aws-sdk');
const Pedido = require('../models/pedidos');

// Importa generateUniqueId directamente desde el modelo
const generateUniqueId = Pedido.generateUniqueId;
// Configura las credenciales de AWS
AWS.config.update({
    region: 'us-east-2', // reemplaza 'tu-region' con la región de tu tabla DynamoDB
    accessKeyId: 'AKIA3BPHK632C3ZZGIS4',
    secretAccessKey: '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',
});

// Crea una instancia de DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient(); // Corregido

// Define el nombre de la tabla de DynamoDB
const tableName = 'restaurantdb'; // reemplaza 'restaurantdb' con el nombre de tu tabla

exports.index = function (req, res) {
  res.sendFile(path.resolve('views/pedidos.html'));
};

exports.create = function (req, res) {
  const newPedido = req.body;

  // Asegúrate de que newPedido tenga una propiedad "id"
  newPedido.id = generateUniqueId();

  // Configura los parámetros para la operación PutItem en DynamoDB
  const params = {
    TableName: tableName,
    Item: newPedido,
  };

  // Ejecuta la operación PutItem en DynamoDB
  dynamoDB.put(params, function (err) {
    if (err) {
      console.error('Error al guardar el pedido en DynamoDB:', err);
      res.status(400).send('Unable to save deliverydb to database');
    } else {
      res.redirect('/pedidos/getpedido');
    }
  });
};

exports.list = function (req, res) {
  // Configura los parámetros para la operación Scan en DynamoDB
  const params = {
    TableName: tableName,
  };

  // Ejecuta la operación Scan en DynamoDB
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error('Error al obtener la lista de pedidos desde DynamoDB:', err);
      return res.status(500).send(err);
    }

    res.render('getpedido', {
      pedidos: data.Items,
    });
  });
};
