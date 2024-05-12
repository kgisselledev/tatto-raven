const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function enviarNotificacionPush(deviceToken, titulo, mensaje) {
    try {
        const message = {
            token: deviceToken,
            notification: {
                title: titulo,
                body: mensaje,
            },
        };
        const response = await admin.messaging().send(message);
        console.log('Notificación push enviada:', response);
    } catch (error) {
        console.error('Error al enviar notificación push:', error);
    }
}

module.exports = { enviarNotificacionPush };