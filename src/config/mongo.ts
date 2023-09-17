import mongoose from 'mongoose';

import { Environment_Variables } from '../enum/EnvironmentVariables';

async function dbConnect(): Promise<void> {
  try {
    let DB_URI = process.env.DB_URI;

    if (process.env.NODE_ENV === Environment_Variables.DEVELOPMENT) {
      DB_URI = process.env.DB_URI_DEVELOPMENT;
    }

    if (process.env.NODE_ENV === Environment_Variables.PRODUCTION) {
      DB_URI = process.env.DB_URI_PRODUCTION;
    }

    if (!DB_URI) {
      throw new Error('No mongodb URI');
    }

    await mongoose.connect(DB_URI);
    console.log('*** CONEXION CORRECTA ***');
  } catch (error) {
    console.log(error);
    console.log(process.env.DB_URI);
    console.log(process.env.NODE_ENV);
    console.log('*** ERROR DE CONEXION ***');
  }
}

export default dbConnect;
