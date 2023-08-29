"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function dbConnect() {
    try {
        const DB_URI = process.env.DB_URI;
        if (!DB_URI) {
            throw new Error('No mongodb URI');
        }
        await mongoose_1.default.connect(DB_URI);
        console.log('*** CONEXION CORRECTA ***');
    }
    catch (error) {
        console.log('*** ERROR DE CONEXION ***');
    }
}
exports.default = dbConnect;
