const express = require("express");
const aspiranteController = require('../controllers/aspiranteController.js');
const router = express.Router();

// Crear aspirante
router.post('/asps', aspiranteController.upload,aspiranteController.crearAspirante);

// Obtener todos los aspirantes
router.get('/asps',aspiranteController.obtenerAspirantes);

// Obtener un aspirante
router.get('/asps/:id',aspiranteController.obtenerAspirante);
/*
// Actualizar un aspirante
router.put('/asps/:id', aspiranteController.actualizarAspirante);

// Borrar un aspirante
router.delete('/asps/:id', aspiranteController.eliminarAspirante);
*/
module.exports = router;