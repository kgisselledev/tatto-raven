const mongoose = require('mongoose');

const tattoSchema = mongoose.Schema({
  nombreCliente: String,
  correo: String,
  direccion: String,
  telefono: String,
  tatuaje: String,
  cantidad: Number,
  estado: String, 
  descripcion: String 
},{
    timestamps: true
});

module.exports = mongoose.model('Tatto', tattoSchema);