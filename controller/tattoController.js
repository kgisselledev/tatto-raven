const Tatto = require('../model/tattoModel.js');
const { enviarNotificacionPush } = require('../firebase/firebase-admin');

exports.create = async (req, res) => {
    console.log('Iniciando función create');
    console.log('Contenido de req.body:', req.body);

    if (!req.body.nombreCliente || !req.body.correo) {
        return res.status(400).send({
            message: 'El nombre y correo son requeridos, por favor llenelos',
        });
    }

    const tatto = new Tatto({
        nombreCliente: req.body.nombreCliente,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        tatuaje: req.body.tatuaje,
        cantidad: req.body.cantidad,
        estado: req.body.estado,
        descripcion: req.body.descripcion,
    });

    try {
        const data = await tatto.save();
        res.send(data);

        const transporter = require('../emailConfig');
        const mailOptions = {
            from: 'karol.ramirezv@cun.edu.co',
            to: req.body.correo,
            subject: 'Agendamiento de tatuaje solicitado',
            html: `
                <img src="../public/img-1.jpg">
                <p>Hola ${req.body.nombreCliente},</p>
                <p>Tu agendamiento de la cita para la realización del tatuaje ha sido recibido. A continuación, se muestran los detalles de la cita:</p>
                <ul>
                    <li>Nombre: ${req.body.nombreCliente}</li>
                    <li>Correo Electrónico: ${req.body.correo}</li>
                    <li>Dirección: ${req.body.direccion}</li>
                    <li>Teléfono: ${req.body.telefono}</li>
                    <li>Tatuaje: ${req.body.tatuaje}</li>
                    <li>Cantidad: ${req.body.cantidad}</li>
                    <li>Descripción: ${req.body.descripcion}</li>
                </ul>
                <p>Gracias por agendar tu cita con nosotros.</p>
                <img src="../public/img-4.jpg">
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            } else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });

    } catch (err) {
        console.error('Error creando Tatto:', err);
        res.status(500).send({
            message: err.message || 'Error creando Tatto',
        });
    }
};


exports.findAll = (req, res) => {
    Tatto.find()
    .then(tattos => {
        res.send(tattos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error trayendo toda la información."
        });
    });
};

exports.findOne = (req, res) => {
    Tatto.findById(req.params.id)
    .then(tatto => {
        if(!tatto) {
            return res.status(404).send({
                message: "Tatto not found with id " + req.params.id
            });            
        }
        res.send(tatto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tatto not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Tatto with id " + req.params.id
        });
    });
};

exports.update = (req, res) => {

    if (!req.body) {
        console.log("El cuerpo de la solicitud está vacío o es indefinido.");
        return res.status(400).send({
            message: "El cuerpo de la solicitud no puede estar vacío"
        });
    }
    
    if (!req.body.descripcion) {
        console.log("Error: La propiedad 'description' no está presente en req.body.");
        return res.status(400).send({
            message: "La descripción del tatuaje no puede estar vacía"
        });
    }

    Tatto.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(tatto => {
            if (!tatto) {
                return res.status(404).send({
                    message: "tatto not found with id " + req.params.id
                });
            }
            res.send(tatto);
        })
        .catch(err => {
            console.error("Error updating tatto:", err);
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "tatto not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating tatto with id " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    Tatto.findByIdAndDelete(req.params.id)
    .then(tatto => {
        if(!tatto) {
            return res.status(404).send({
                message: "tatto not found with id " + req.params.id
            });
        }
        res.send({message: "tatto deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "tatto not found with id " + req.params.tatto
            });                
        }
        return res.status(500).send({
            message: "Could not delete tatto with id " + req.params.id
        });
    });
};
