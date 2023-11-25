const express = require("express");
const libroController = require('../controllers/libroController.js');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

// Crear libro
router.post('/lib', upload.single('foto'), libroController.guardarLibro);

// Ruta para suscribirse a un libro
router.post('/suscribirse', libroController.suscribirseALibro);

// Ruta para cancelar la suscripción a un libro
router.post('/cancelar-suscripcion', libroController.cancelarSuscripcion);

module.exports = router;