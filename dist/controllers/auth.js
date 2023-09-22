"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginController = exports.createAuthRegisterController = void 0;
const express_validator_1 = require("express-validator");
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const index_1 = __importDefault(require("../models/index"));
const handleJwt_1 = require("../middlewares/handleJwt");
const handleJwt_2 = require("../utils/handleJwt");
async function createAuthRegisterController(req, res) {
    try {
        const { body } = req;
        const encryptedPassword = await (0, handleJwt_1.encrypt)(body.password);
        const userData = { ...body, password: encryptedPassword };
        const newAuth = await index_1.default.users.create(userData);
        newAuth.set('password', undefined, { strict: false });
        const { role, _id } = newAuth;
        const data = {
            token: await (0, handleJwt_2.tokenSign)({
                role: newAuth.role,
                _id: newAuth.id
            }),
            role,
            _id
        };
        res.send({ data });
    }
    catch (error) {
        console.error(error);
        (0, handleErrors_1.default)(res, 'Cannot create auth');
    }
}
exports.createAuthRegisterController = createAuthRegisterController;
async function authLoginController(req, res) {
    try {
        const { email, password } = (0, express_validator_1.matchedData)(req);
        const user = await index_1.default.users
            .findOne({ email: email })
            .select('password');
        const userData = await index_1.default.users.findOne({
            email: email
        });
        if (!user) {
            (0, handleErrors_1.default)(res, 'Usuario no existe');
            return;
        }
        const hashPassword = user.password;
        const checkPassword = await (0, handleJwt_1.compare)(password, hashPassword);
        if (!checkPassword) {
            (0, handleErrors_1.default)(res, 'Password no valido');
            return;
        }
        user.set('password', undefined, { strict: false });
        const data = {
            token: await (0, handleJwt_2.tokenSign)({
                _id: user._id,
                role: userData === null || userData === void 0 ? void 0 : userData.role
            }),
            name: user === null || user === void 0 ? void 0 : user.name,
            id: user === null || user === void 0 ? void 0 : user._id,
            role: user === null || user === void 0 ? void 0 : user.role,
            email: user.email,
            birthdate: user === null || user === void 0 ? void 0 : user.birthdate,
            twitter: user === null || user === void 0 ? void 0 : user.twitter,
            instagram: user === null || user === void 0 ? void 0 : user.instagram,
            susbcriptionStatus: user === null || user === void 0 ? void 0 : user.subscriptionStatus,
            subscriptionExpirationDate: user === null || user === void 0 ? void 0 : user.subscriptionExpirationDate
        };
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot login');
    }
}
exports.authLoginController = authLoginController;
