"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSuscription = exports.updateSuscription = void 0;
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
// import models from '../models/index';
async function updateSuscription(req, res) {
    try {
        res.send('hola');
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot suscribe');
    }
}
exports.updateSuscription = updateSuscription;
async function removeSuscription(_req, res) {
    try {
        res.send('hola');
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot remove suscription');
    }
}
exports.removeSuscription = removeSuscription;
