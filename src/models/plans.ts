import mongoose, { Document, Schema } from "mongoose";


export interface Plans extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

const plansSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique:true 
    },

    description: {
      type: String
    },

    price: {
      type: Number
    },

    image: {
      type :String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('planModel', plansSchema);