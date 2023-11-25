const Autor = require("../models/autor.js");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

exports.guardarAutor = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se proporcionaron los archivos');
        }

        const { nombre, biografia } = req.body;

        const foto = req.file;

        const fechReg = new Date();
        fechReg.setHours(0, 0, 0, 0);

        const autor = new Autor({
            nombre,
            biografia,
            foto: {
                data: foto.buffer,
                contentType: foto.mimetype
            }
        });

        await autor.save();

        res.send(autor);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}