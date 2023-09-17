"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EnvironmentVariables_1 = require("../enum/EnvironmentVariables");
async function dbConnect() {
    try {
        let DB_URI = process.env.DB_URI;
        if (process.env.NODE_ENV === EnvironmentVariables_1.Environment_Variables.DEVELOPMENT) {
            DB_URI = process.env.DB_URI_DEVELOPMENT;
        }
        if (process.env.NODE_ENV === EnvironmentVariables_1.Environment_Variables.PRODUCTION) {
            console.log(process.env.DB_URI_PRODUCTION);
            DB_URI = process.env.DB_URI_PRODUCTION;
        }
        if (!DB_URI) {
            throw new Error('No mongodb URI');
        }
        await mongoose_1.default.connect(DB_URI);
        console.log('*** CONEXION CORRECTA ***');
    }
    catch (error) {
        console.log('*** ERROR DE CONEXION ***', error);
        console.log('DB-URI variable', process.env.DB_URI);
        console.log('*** NODE_ENV ***', process.env.NODE_ENV);
    }
}
exports.default = dbConnect;
