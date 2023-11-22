const express = require("express");
const aspiranteController = require('../controllers/aspiranteController.js');
const router = express.Router();
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



// Crear aspirante
router.post('/asps', upload.fields([{ name: 'foto' }, { name: 'cert' }, { name: 'compDom' }]), aspiranteController.guardarAspirante);

// Obtener todos los aspirantes
router.get('/asps',aspiranteController.obtenerAspirantes);

// Obtener un aspirante
router.get('/asps/:id',aspiranteController.obtenerAspirante);

module.exports = router;