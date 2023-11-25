const Usuario = require("../models/usuario.js");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const Libro = require("../models/libro.js");

const observadoresLibro = {};

exports.cancelarSuscripcion = async (req, res) => {
    try {
        const { usuarioId, libroId } = req.body;

        // Verifica si el libro tiene observadores
        if (!observadoresLibro[libroId]) {
            return res.status(404).send('No hay observadores para este libro');
        }

        // Verifica si el usuario está en la lista de observadores
        const indiceUsuario = observadoresLibro[libroId].indexOf(usuarioId);
        if (indiceUsuario === -1) {
            return res.status(404).send('Usuario no encontrado en la lista de observadores');
        }

        // Remueve al usuario de la lista de observadores
        observadoresLibro[libroId].splice(indiceUsuario, 1);

        res.send(`Te has desuscrito exitosamente del libro.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.suscribirseALibro = async (req, res) => {
    try {
        const { usuarioId, libroId } = req.body;

        const usuario = await Usuario.findById(usuarioId);
        const libro = await Libro.findById(libroId);

        if (!usuario || !libro) {
            return res.status(404).send('Usuario o libro no encontrado');
        }

        if (!observadoresLibro[libroId]) {
            observadoresLibro[libroId] = [];
        }

        if (!observadoresLibro[libroId].includes(usuarioId)) {
            observadoresLibro[libroId].push(usuarioId);

            res.send(`¡Te has suscrito exitosamente al libro "${libro.titulo}"!`);
        } else {
            res.send('Ya estás suscrito a este libro.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};


exports.guardarUsuario = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se proporcionaron los archivos');
        }

        const { nombre, direccion, informacionContacto  } = req.body;

        const foto = req.files['foto'][0];

        const fechReg = new Date();
        fechReg.setHours(0, 0, 0, 0);

        const usuario = new Usuario({
            nombre,
            direccion,
            informacionContacto: {
                correo: informacionContacto.correo,
                telefono: informacionContacto.telefono
            },
            foto: {
                data: foto.buffer,
                contentType: foto.mimetype
            }
        });

        await usuario.save();

        res.send(usuario);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}