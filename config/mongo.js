const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI;
    mongoose.useNewUrlParser = true;
    mongoose.useUnifiedTopology = true;
    await mongoose.connect(DB_URI);
    console.log('*** CONEXION CORRECTA ***');
  } catch (error) {
    console.log('*** ERROR DE CONEXION ***');
  }
};

module.exports = dbConnect;