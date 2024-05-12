const express = require('express');
const bodyParser = require('body-parser');
const tattoRoutes = require('./routes/tattoRoutes.js');
const mongoose = require('mongoose');
const path = require('path'); 
const opn = require('opn'); 

const app = express();
const port = 5000;


const dbConfig = require('./config/database.config.js');
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conexión exitosa a la base de datos");
}).catch(err => {
  console.log('No se pudo conectar a la base de datos. Cerrando...', err);
  process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


tattoRoutes(app);


app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  opn('http://localhost:5000/TattoRavenAgenda.html'); 
});