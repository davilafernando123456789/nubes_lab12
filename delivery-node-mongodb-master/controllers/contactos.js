const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const Contacto = require('../models/contactos');

aws.config.update({
    region: 'us-east-2', // reemplaza 'tu-region' con la región de tu tabla DynamoDB
    accessKeyId: 'AKIA3BPHK632C3ZZGIS4',
    secretAccessKey: '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',
});

const s3 = new aws.S3();

exports.index = function (req, res) {
    res.sendFile(path.resolve('views/contactos.html'));
};
// Importa el modelo de contacto

exports.list = function (req, res) {
    // Lógica para obtener la lista de contactos y renderizar la vista
    Contacto.getAll(function (err, contactos) {
        if (err) {
            return res.status(500).send(err);
        }

        res.render('contactos', {
            contactos: contactos
        });
    });
};


exports.create = function (req, res) {
    res.sendFile(path.resolve('views/createcontacto.html'));
};

exports.edit = function (req, res) {
    const contactoId = req.params.id;

    // Lógica para obtener los datos del contacto por el ID
    Contacto.getById(contactoId, function (err, contacto) {  // Utiliza getById en lugar de findById
        if (err) {
            return res.status(500).send(err);
        }

        if (!contacto) {
            return res.status(404).send('Contacto no encontrado');
        }

        res.render('editcontacto', {
            contacto: contacto
        });
    });
};

exports.createContacto = function (req, res) {
    // Lógica para manejar la imagen y almacenarla en S3
    if (req.file) {
        const fileContent = fs.readFileSync(req.file.path);

        const params = {
            Bucket: 'nubeslab12',
            Key: req.file.filename,
            Body: fileContent,
            ContentType: req.file.mimetype
        };

        s3.upload(params, function (err, data) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al subir la imagen a S3');
            }

            fs.unlinkSync(req.file.path);

            const nuevoContacto = {
                ...req.body,
                foto: data.Location
            };

            Contacto.create(nuevoContacto, function (err, result) {
                if (err) {
                    return res.status(400).send('Unable to save contact to database');
                }

                res.redirect('/contactos');
            });
        });
    } else {
        const nuevoContacto = req.body;

        Contacto.create(nuevoContacto, function (err, result) {
            if (err) {
                return res.status(400).send('Unable to save contact to database');
            }

            res.redirect('/contactos');
        });
    }
};

exports.updateContacto = function (req, res) {
    const contactoId = req.params.id;

    if (req.file) {
        const fileContent = fs.readFileSync(req.file.path);

        const params = {
            Bucket: 'nubeslab12',
            Key: req.file.filename,
            Body: fileContent,
            ContentType: req.file.mimetype
        };

        s3.upload(params, function (err, data) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al subir la imagen a S3');
            }

            fs.unlinkSync(req.file.path);

            const nuevosDatos = {
                ...req.body,
                foto: data.Location
            };

            Contacto.updateById(contactoId, nuevosDatos, function (err, results) {
                if (err) {
                    return res.status(500).send(err);
                }
            
                // Eliminar la imagen antigua en S3
                if (results[0].foto) {
                    const keyAntiguo = results[0].foto.split('/').pop();
                    const paramsAntiguo = {
                        Bucket: 'nubeslab12',
                        Key: keyAntiguo
                    };
            
                    s3.deleteObject(paramsAntiguo, function (err, data) {
                        if (err) {
                            console.error(err);
                        }
            
                        res.redirect('/contactos');
                    });
                } else {
                    res.redirect('/contactos');
                }
            });
            
            
        });
    } else {
        const nuevosDatos = req.body;

        Contacto.updateById(contactoId, nuevosDatos, function (err, results) {
            if (err) {
                return res.status(500).send(err);
            }

            res.redirect('/contactos');
        });
    }
};

exports.deleteContacto = function (req, res) {
    const contactoId = req.params.id;

    Contacto.deleteById(contactoId, function (err, results) {
        if (err) {
            return res.status(500).send(err);
        }

        // No estoy seguro de si el siguiente bloque está correcto,
        // ya que no veo el formato exacto de tu respuesta al eliminar.
        // Asegúrate de que `resultados[0].foto` sea la URL de la imagen en S3.

        if (results[0].foto) {
            const key = results[0].foto.split('/').pop();
            const params = {
                Bucket: 'nubeslab12',
                Key: key
            };
    
            s3.deleteObject(params, function (err, data) {
                if (err) {
                    console.error(err);
                }
    
                res.redirect('/contactos');
            });
        } else {
            res.redirect('/contactos');
        }
    });
};