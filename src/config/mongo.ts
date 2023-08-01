import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const DB_URI = process.env.DB_URI;

    if (!DB_URI) {
      throw new Error('No mongodb URI')
    }

    await mongoose.connect(DB_URI);
    console.log('*** CONEXION CORRECTA ***');
  } catch (error) {
    console.log('*** ERROR DE CONEXION ***');
  }
};

export default dbConnect;