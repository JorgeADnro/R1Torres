const Aspirante = require("../models/aspirante");
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

exports.upload = upload.fields([{ name: 'foto' }, { name: 'cert' }, { name: 'compDom' }]);

exports.crearAspirante = async(req,res) =>{
    try {
        let aspirante;
        if (req.files) {
            console.log('Archivos subidos:', req.files);

            // Asignar la información del archivo al objeto aspirante
            req.body.foto = req.files['foto'][0];
            req.body.cert = req.files['cert'][0];
            req.body.compDom = req.files['compDom'][0];
        }

        aspirante = new Aspirante(req.body);
        await aspirante.save();
        res.send(aspirante);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerAspirantes = async(req,res) =>{
    try {
        const aspirantes = await Aspirante.find();
        res.json(aspirantes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerAspirante = async(req,res) =>{
    try {
        let aspirante = await Aspirante.findById(req.params.id);
        if(!aspirante){
            res.status(404).json({msg: "No existe el aspirante"});
        }
        res.json(aspirante);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}