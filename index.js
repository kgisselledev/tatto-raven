const express = require('express');
const bodyParser = require('body-parser');
const tattoApp = express();

tattoApp.use(bodyParser.json())
tattoApp.use(bodyParser.urlencoded({extended: true}))

require('./routes/tattoRoutes.js')(tattoApp);

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => {
    console.log("Conexión exitosa a la base de datos");    
}).catch(err => {
    console.log('No se pudo conectar a la base de datos. Cerrando...', err);
    process.exit();
});

tattoApp.get('/', (req, res) => {
    res.json({"message": "Bienvenido a Tatto-Raven"});
});

tattoApp.listen(5000, () => {
    console.log("Conectado al puerto 5000");
});
