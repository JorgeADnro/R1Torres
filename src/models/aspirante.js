const mongoose = require("mongoose");

const aspiranteSchema = mongoose.Schema({
    mat: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    apeP: {
        type: String,
        required: true
    },
    apeM: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    no: {
        type: String,
        required: true
    },
    col: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    cp: {
        type: Number,
        required: true
    },
    numTelCa: {
        type: String,
        required: true
    },
    numTelAsp: {
        type: String,
        required: true
    },
    numTelMaPa: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    nomBach: {
        type: String,
        required: true
    },
    promBach: {
        type: Number,
        required: true
    },
    espCur: {
        type: String,
        required: true
    },
    nomMa: {
        type: String,
        required: true
    },
    apePMa: {
        type: String,
        required: true
    },
    apeMMa: {
        type: String,
        required: true
    },
    nomPa: {
        type: String,
        required: true
    },
    apePPa: {
        type: String,
        required: true
    },
    apeMPa: {
        type: String,
        required: true
    },
    fechReg: {
        type: Date,
        require: true
    },
    carrCur: {
        type: String,
        required: true
    },
    foto: {
        data: Buffer,
        contentType: String
    },
    cert: {
        data: Buffer,
        contentType: String
    },
    compDom: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Aspirante', aspiranteSchema);