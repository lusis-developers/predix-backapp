"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidatorRegister = void 0;
const express_validator_1 = require("express-validator");
const handleValidator_1 = __importDefault(require("../utils/handleValidator"));
const authValidatorRegister = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Mail is required')
        .isEmail()
        .withMessage('Invalid email format'),
    (0, express_validator_1.check)('password')
        .not()
        .isIn([
        'password',
        'qwertyuio',
        'qwertyui',
        'qwertyuiop',
        '12345678',
        '123456789',
        '1234567890',
        '1234567890-',
        '1234567890-='
    ])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 8 })
        .withMessage('Min Length 8 characters')
        .matches(/\W/)
        .withMessage('Password must contain at least one symbol')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string'),
    (0, express_validator_1.check)('birthdate')
        .exists()
        .notEmpty()
        .isISO8601()
        .withMessage('Date is required'),
    (req, res, next) => {
        return (0, handleValidator_1.default)(req, res, next);
    }
];
exports.authValidatorRegister = authValidatorRegister;
