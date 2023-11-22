const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phpmailertest633@gmail.com',
        pass: 'difr gafm uwik vlle'
    }
});

// Función que envía el correo
exports.notificarEstudiante = (mail, mat, nom, apeP, apeM) => {
    const mailOptions = {
        from: 'phpmailertest633@gmail.com',
        to: mail,
        subject: `Bienvenido ${nom} ${apeP} ${apeM}!`,
        text: `Te damos la bienvenida a nuestra universidad! Tu nueva matrícula de estudiante es: ${mat}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};
