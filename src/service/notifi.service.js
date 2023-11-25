const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jorgelamanrique@gmail.com',
        pass: 'bqvx gxxy wnuo tivm'
    },
    tls: {
        rejectUnauthorized: false // Desactivar la validación del certificado
    },
});

// Función que envía el correo
exports.notificarEstudiante = (mail, mat, nom, apeP, apeM) => {
    const mailOptions = {
        from: 'jorgelamanrique@gmail.com',
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
