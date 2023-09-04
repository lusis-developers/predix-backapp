import mongoose, { Schema } from 'mongoose';

const usersSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String
    },

    userimage: {
      type: String
    },

    mail: {
      type: String,
      unique: true
    },

    phone: {
      type: String,
      unique: true
    },

    birthdate: {
      type: Date
    },

    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('users', usersSchema);
