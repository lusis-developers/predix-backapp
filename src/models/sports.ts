import mongoose, { Document, Schema } from "mongoose";

export interface Sports extends Document {
  sport: string;
  image: string;
}

const sportsSchema: Schema = new mongoose.Schema(
  {
    sport: {
      type: String,
      unique: true 
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('sports', sportsSchema);



