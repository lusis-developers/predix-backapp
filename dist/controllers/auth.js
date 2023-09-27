"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationController = exports.authLoginController = exports.createAuthRegisterController = void 0;
const express_validator_1 = require("express-validator");
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const index_1 = __importDefault(require("../models/index"));
const handleJwt_1 = require("../middlewares/handleJwt");
const handleJwt_2 = require("../utils/handleJwt");
const sendGrid_1 = require("../services/sendGrid");
const EmailVerification_1 = require("../emails/EmailVerification");
// import { generatePasswordRecoveryTemplate } from '../emails/PasswordRecovery';
async function createAuthRegisterController(req, res) {
    try {
        const { body } = req;
        const email = body.email;
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
        const token = `https://predix.ec/${data.token}`;
        const verificationBody = (0, EmailVerification_1.generateEmailVerificationTemplate)(token);
        (0, sendGrid_1.sendEmail)(email, 'VERIFICATION EMAIL', verificationBody);
        res.send({ data });
    }
    catch (error) {
        console.error(error);
        (0, handleErrors_1.default)(res, 'Cannot create user', 401);
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
            (0, handleErrors_1.default)(res, 'User or password are not valid', 401);
            return;
        }
        const hashPassword = user.password;
        const checkPassword = await (0, handleJwt_1.compare)(password, hashPassword);
        if (!checkPassword) {
            (0, handleErrors_1.default)(res, 'User or password are not valid', 401);
            return;
        }
        user.set('password', undefined, { strict: false });
        const data = {
            token: await (0, handleJwt_2.tokenSign)({
                _id: user._id,
                role: userData === null || userData === void 0 ? void 0 : userData.role
            }),
            name: userData === null || userData === void 0 ? void 0 : userData.name,
            id: userData === null || userData === void 0 ? void 0 : userData._id,
            role: userData === null || userData === void 0 ? void 0 : userData.role,
            email: userData === null || userData === void 0 ? void 0 : userData.email,
            birthdate: userData === null || userData === void 0 ? void 0 : userData.birthdate,
            twitter: userData === null || userData === void 0 ? void 0 : userData.twitter,
            instagram: userData === null || userData === void 0 ? void 0 : userData.instagram,
            susbcriptionStatus: userData === null || userData === void 0 ? void 0 : userData.subscriptionStatus,
            subscriptionExpirationDate: userData === null || userData === void 0 ? void 0 : userData.subscriptionExpirationDate
        };
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot auth user', 401);
    }
}
exports.authLoginController = authLoginController;
async function emailVerificationController(req, res) {
    try {
        const id = req.body.id;
        const user = await index_1.default.users.findById(id);
        if (!user) {
            (0, handleErrors_1.default)(res, 'User do not exist', 402);
            return;
        }
        await index_1.default.users.findByIdAndUpdate(id, {
            $set: {
                emailVerified: true
            }
        });
        res.send({ message: 'User verified' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot verify user', 401);
    }
}
exports.emailVerificationController = emailVerificationController;
