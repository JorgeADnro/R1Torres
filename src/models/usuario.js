const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    informacionContacto: {
        correo: {
            type: String,
            required: false
        },
        telefono: {
            type: String,
            required: false
        }
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);