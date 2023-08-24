import mongoose, { Document, Schema } from 'mongoose';

export interface Leagues extends Document {
  name: string;
  image: string;
  sport: mongoose.Schema.Types.ObjectId;
}

const leaguesSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    image: {
      type: String
    },
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sports'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('leagues', leaguesSchema);
