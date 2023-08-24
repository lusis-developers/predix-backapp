import mongoose, { Document, Schema } from 'mongoose';

export interface Sports extends Document {
  name: string;
  image: string;
}

const sportsSchema: Schema = new mongoose.Schema(
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

interface SportsModel extends mongoose.Model<Sports> {
  findAllData(): any[];
}

sportsSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'leagues',
        localField: 'league',
        foreignField: 'sport',
        as: 'LeaguesDetails'
      }
    }
  ]);
  return joinData;
};

export default mongoose.model<Sports, SportsModel>('sports', sportsSchema);
