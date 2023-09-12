import mongoose, { Schema } from 'mongoose';

const authSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true
    },

    password: {
      type: String,
      require: true
    },

    birthdate: {
      type: Date,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('auth', authSchema);
