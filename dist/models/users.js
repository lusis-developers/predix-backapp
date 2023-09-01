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
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('users', usersSchema);
