import mongoose, { Schema } from 'mongoose';

const betsSchema: Schema = new mongoose.Schema(
  {
    sport: {
      type: String
    },
    league: {
      type: String
    },
    teamA: {
      type: String
    },
    teamB: {
      type: String
    },
    date: {
      type: Date
    },
    profit: {
      type: Number
    },
    percentage: {
      type: Number
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('bets', betsSchema);
