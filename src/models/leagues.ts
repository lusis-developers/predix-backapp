import mongoose, { Document, Schema } from "mongoose";

export interface Leagues extends Document {
  name: string;
  image: string;
}

const leaguesSchema: Schema = new mongoose.Schema(
  {
    name: {
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

export default mongoose.model('leagues', leaguesSchema);
