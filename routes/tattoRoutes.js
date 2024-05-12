    module.exports = (tattoApp) => {
        const tatto = require('../controller/tattoController.js');
        tattoApp.post('/tatto', tatto.create);
        tattoApp.get('/tatto', tatto.findAll);
        tattoApp.get('/tatto/:id', tatto.findOne);
        tattoApp.put('/tatto/:id', tatto.update);
        tattoApp.delete('/tatto/:id', tatto.delete);
    }