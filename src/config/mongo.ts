import mongoose from 'mongoose';

async function dbConnect(): Promise<void> {
  try {
    let DB_URI = process.env.DB_URI;

    if (process.env.NODE_ENV === 'production') {
      DB_URI = process.env.DB_URI_PRODUCTION;
    }

    if (!DB_URI) {
      throw new Error('No mongodb URI');
    }

    await mongoose.connect(DB_URI);
    console.log('*** CONEXION CORRECTA ***');
  } catch (error) {
    console.log('*** ERROR DE CONEXION ***');
  }
}

export default dbConnect;
