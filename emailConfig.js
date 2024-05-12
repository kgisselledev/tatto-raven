const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'correo', 
    pass: 'correo', 
  },
});

module.exports = transporter;