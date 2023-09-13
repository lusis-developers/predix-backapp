"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs_1.default.hash(passwordPlain, 10);
    return hash;
};
exports.encrypt = encrypt;
