import mongoose, { Document, Schema } from "mongoose";

export interface Leagues extends Document {
  league: string;
  image: string;
}

const leaguesSchema: Schema = new mongoose.Schema(
  {
    league: {
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
