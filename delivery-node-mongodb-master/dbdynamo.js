const AWS = require('aws-sdk');

// Configura las credenciales de AWS
AWS.config.update({
  region: 'us-east-2', // reemplaza 'tu-region' con la región de tu tabla DynamoDB
  accessKeyId: 'AKIA3BPHK632C3ZZGIS4',
  secretAccessKey: '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',
});

// Crea una instancia de DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Define el nombre de la tabla de DynamoDB
const tableName = 'restaurantdb'; // reemplaza 'restaurantdb' con el nombre de tu tabla

exports.create = function (req, res) {
  const newPedido = req.body;

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
