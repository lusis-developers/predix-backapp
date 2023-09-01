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
      type: Number,
      unique: true
    },

    birthday: {
      type: Date
    },

    redesSociales: {
      twitter: {
        type: String
      },
      instagram: {
        type: String
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('users', usersSchema);
