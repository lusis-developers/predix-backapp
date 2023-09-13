"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidatorRegister = void 0;
const express_validator_1 = require("express-validator");
const handleValidator_1 = __importDefault(require("../utils/handleValidator"));
const userValidatorRegister = [
    (0, express_validator_1.check)('id').exists().notEmpty().isMongoId(),
    (0, express_validator_1.check)('name').exists().notEmpty().isMongoId(),
    (0, express_validator_1.check)('mail')
        .notEmpty()
        .withMessage('Mail is required')
        .isEmail()
        .withMessage('Invalid email format'),
    (req, res, next) => {
        return (0, handleValidator_1.default)(req, res, next);
    }
];
exports.userValidatorRegister = userValidatorRegister;
