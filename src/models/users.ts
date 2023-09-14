import mongoose, { Schema } from 'mongoose';

const usersSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },

    userImage: {
      type: String
    },

    role: {
      type: ['user', 'admin'],
      default: 'admin'
    },

    email: {
      type: String,
      unique: true,
      require: true
    },

    phone: {
      type: String
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
    },

    password: {
      type: String,
      require: true,
      select: false
    },

    subscriptionStatus: {
      type: Boolean,
      default: false
    },

    subscriptionExpirationDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('users', usersSchema);
