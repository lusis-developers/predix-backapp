import mongoose from 'mongoose';

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;

  mongoose.connect(String(DB_URI));

  const db = mongoose.connection;
  
  db.on('error', () => {
    console.log('*** ERROR DE CONEXION ***');
  });

  db.once('open', () => {
    console.log('*** CONEXION PERFECTA ***');
  });
};

export default dbConnect;





// const mongoose = require('mongoose');

// const dbConnect = async (): Promise<void> => {
//   try {
//     const DB_URI = process.env.DB_URI;
//     mongoose.useNewUrlParser = true;
//     mongoose.useUnifiedTopology = true;
//     await mongoose.connect(DB_URI);
//     console.log('*** CONEXION CORRECTA ***');
//   } catch (error) {
//     console.log('*** ERROR DE CONEXION ***');
//   }
// };

// module.exports = dbConnect;