import mongoose, { Schema } from 'mongoose';

const usersSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },

    userImage: {
      type: String
    },

    email: {
      type: String,
      unique: true,
      require: true
    },

    phone: {
      type: String,
      unique: true
    },

    birthdate: {
      type: Date,
      require: true
    },

    twitter: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('users', usersSchema);
