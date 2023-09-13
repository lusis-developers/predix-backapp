"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    userImage: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
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
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('users', usersSchema);
