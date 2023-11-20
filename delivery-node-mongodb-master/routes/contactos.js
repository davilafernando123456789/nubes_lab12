const express = require('express');
const router = express.Router();
const contactos = require('../controllers/contactos');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
// ...

// Antes de tus rutas
app.use(methodOverride('_method'));
// Ruta para listar contactos
router.get('/', function (req, res) {
    contactos.list(req, res);
});

// Ruta para listar contactos
router.get('/create', function (req, res) {
    contactos.create(req, res);
});


//Ruta para obtener un contacto por ID
router.get('/:id', function (req, res) {
    contactos.getContacto(req, res);
});

// Ruta para agregar un nuevo contacto
router.post('/addcontacto', upload.single('foto'), function (req, res) {
    contactos.createContacto(req, res);
});


// Ruta para actualizar un contacto por ID
router.put('/update/:id', upload.single('foto'), function (req, res) {
    contactos.updateContacto(req, res);
});

// Ruta para eliminar un contacto por ID
router.delete('/delete/:id', function (req, res) {
    contactos.deleteContacto(req, res);
});

router.get('/edit/:id', function (req, res) {

    contactos.edit(req, res);
});

module.exports = router;
