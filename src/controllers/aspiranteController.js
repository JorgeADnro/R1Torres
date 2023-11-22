const Aspirante = require("../models/aspirante");
const Ciudades = require("../models/ciudad.js");
const Bachiller = require("../models/bachiller.js");
const Especialidad = require("../models/especialidad.js");
const Carrera = require("../models/carrera.js");
const multer = require('multer')
const { notificarEstudiante } = require('../service/notifi.service.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

exports.guardarAspirante = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se proporcionaron los archivos');
        }

        const { nom, apeP, apeM, calle, no, col, ciudad, cp, numTelCa, numTelAsp, numTelMaPa, nomBach, espCur,
            nomMa, apePMa, apeMMa, nomPa, apePPa, apeMPa, carrCur, mail } = req.body;

        const mat = generarMatricula(apeP, apeM, nom);
        const foto = req.files['foto'][0];
        const cert = req.files['cert'][0];
        const compDom = req.files['compDom'][0];

        const aspirante = new Aspirante({
            mat,
            nom,
            apeP,
            apeM,
            calle,
            no,
            col,
            ciudad,
            cp,
            numTelCa,
            numTelAsp,
            numTelMaPa,
            nomBach,
            espCur,
            nomMa,
            apePMa,
            apeMMa,
            nomPa,
            apePPa,
            apeMPa,
            carrCur,
            mail,
            foto: {
                data: foto.buffer,
                contentType: foto.mimetype
            },
            cert: {
                data: cert.buffer,
                contentType: cert.mimetype
            },
            compDom: {
                data: compDom.buffer,
                contentType: compDom.mimetype
            }
        });

        await aspirante.save();

        notificarEstudiante(mail, mat, nom, apeP, apeM);

        res.send(aspirante);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};


function quitarAcentos(texto) {
    if(texto && texto.normalize){
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
    console.error("La cadena es nula o no tiene el método 'normalize'.");
  }
}

function generarMatricula(apeP, apeM, nom) {
    // Quitar acentos de los apellidos y del primer nombre
    const apePaternoSinAcentos = quitarAcentos(apeP);
    const apeMaternoSinAcentos = quitarAcentos(apeM);
    const primerNombreSinAcentos = quitarAcentos(nom);

    // Obtener las dos primeras letras del apellido paterno y materno, y la primera letra del primer nombre
    const letras = `${apePaternoSinAcentos.slice(0, 2)}${apeMaternoSinAcentos.slice(0, 2)}${primerNombreSinAcentos.charAt(0)}`;

    // Obtener dos dígitos del mes y los dos últimos dígitos del año
    const fecha = new Date();
    const mes = `0${fecha.getMonth() + 1}`.slice(-2);
    const año = fecha.getFullYear().toString().slice(-2);

    // Formar la matrícula sin números aleatorios
    const matricula = `${letras}-${mes}${año}`;

    return matricula.toUpperCase();
}

exports.obtenerAspirantes = async (req, res) => {
    try {
        const aspirantes = await Aspirante.find();
        const aspirantesConBase64 = aspirantes.map(aspirante => {
            const fotoBase64 = aspirante.foto.data.toString('base64');
            const certBase64 = aspirante.cert.data.toString('base64');
            const compDomBase64 = aspirante.compDom.data.toString('base64');
            return {
                ...aspirante.toObject(),
                foto: fotoBase64,
                cert: certBase64,
                compDom: compDomBase64,
            };
        });
        res.json(aspirantesConBase64);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudades.find();
        res.json(ciudades);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerBachiller = async (req, res) => {
    try {
        const bachiller = await Bachiller.find();
        res.json(bachiller);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.find();
        res.json(especialidad);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCarreras = async (req, res) => {
    try {
        const carrera = await Carrera.find();
        res.json(carrera);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerAspirante = async (req, res) => {
    try {
        let aspirante = await Aspirante.findById(req.params.id);

        if (!aspirante) {
            return res.status(404).json({ msg: "No existe el aspirante" });
        }

        // Devolver información completa del aspirante, incluido el archivo PDF
        res.json({
            _id: aspirante._id,
            nom: aspirante.nom,
            apeP: aspirante.apeP,
            cert: {
                contentType: aspirante.cert.contentType,
                data: aspirante.cert.data // Convertir los datos del archivo a base64
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}