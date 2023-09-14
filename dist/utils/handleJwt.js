"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
async function tokenSign(user) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }
    const sign = await jsonwebtoken_1.default.sign({
        _id: user._id,
        role: user.role[0]
    }, JWT_SECRET, {
        expiresIn: '2h'
    });
    return sign;
}
exports.default = tokenSign;
