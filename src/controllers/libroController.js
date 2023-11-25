const Libro = require("../models/libro.js");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Lista de observadores interesados en la disponibilidad de libros
const observadoresLibro = [];

// Agrega un observador a la lista
function agregarObservadorLibro(observador) {
    observadoresLibro.push(observador);
}

// Remueve un observador de la lista
function removerObservadorLibro(observador) {
    observadoresLibro = observadoresLibro.filter(o => o !== observador);
}

// Notifica a todos los observadores que el libro está disponible
function notificarDisponibilidadLibro(libro) {
    observadoresLibro.forEach(observador => observador(libro));
}

exports.guardarLibro = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se proporcionaron los archivos');
        }

        const { titulo, autor, editorial, fechpubl, gen, sinop, numpag } = req.body;

        const foto = req.file;

        const fechReg = new Date();
        fechReg.setHours(0, 0, 0, 0);

        const libro = new Libro({
            titulo,
            autor,
            editorial,
            fechpubl,
            gen,
            sinop,
            numpag,
            foto: {
                data: foto.buffer,
                contentType: foto.mimetype
            }
        });

        await libro.save();

        // Notificar a los observadores que el libro está disponible
        notificarDisponibilidadLibro(libro);

        res.send(libro);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

agregarObservadorLibro(libro => {
    console.log(`¡El libro "${libro.titulo}" está disponible!`);
});