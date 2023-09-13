"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRegister = void 0;
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const index_1 = __importDefault(require("../models/index"));
const handleJwt_1 = require("../middlewares/handleJwt");
const handleJwt_2 = __importDefault(require("../utils/handleJwt"));
async function createAuthRegister(req, res) {
    try {
        const { body } = req;
        const encryptedPassword = await (0, handleJwt_1.encrypt)(req.body.password);
        const newBody = { ...body, password: encryptedPassword };
        const newAuth = await index_1.default.auth.create(newBody);
        newAuth.set('password', undefined, { strict: false });
        const data = {
            token: await (0, handleJwt_2.default)(newAuth),
            user: newAuth
        };
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot create auth');
    }
}
exports.createAuthRegister = createAuthRegister;
