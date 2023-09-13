"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersRegisterSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    mail: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    birthdate: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('users', usersRegisterSchema);
