import mongoose, { Document, Schema } from "mongoose";


export interface Iplan extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  image: string;
}

const planSchema: Schema = new mongoose.Schema({
  nombre: {
    type: String,
    unique:true
  },

  descripcion: {
    type: String
  },

  precio: {
    type: Number
  },

  image: {
    type :String
  }
},
{
  timestamps: true,
  versionKey: false
});

export default mongoose.model('plan', planSchema);

