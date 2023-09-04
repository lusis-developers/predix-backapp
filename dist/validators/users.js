"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidatorDelete = exports.userValidatorUpdate = exports.userValidatorCreate = void 0;
const express_validator_1 = require("express-validator");
const handleValidator_1 = __importDefault(require("../utils/handleValidator"));
const userValidatorCreate = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .isString()
        .withMessage('Name is required')
        .isLength({ max: 20 })
        .withMessage('Max Length 20 characters'),
    (0, express_validator_1.check)('userimage')
        .notEmpty()
        .withMessage('Image is required')
        .isURL()
        .withMessage('Invalid image URL'),
    (0, express_validator_1.check)('mail')
        .notEmpty()
        .withMessage('Mail is required')
        .isEmail()
        .withMessage('Invalid email format'),
    (0, express_validator_1.check)('phone')
        .notEmpty()
        .withMessage('Phone is required')
        .isString()
        .withMessage('Only number is allowed'),
    (0, express_validator_1.check)('birthdate')
        .exists()
        .notEmpty()
        .isISO8601()
        .withMessage('Date is required'),
    (0, express_validator_1.check)('twitter')
        .optional()
        .isString()
        .withMessage('Invalid twitter handle')
        .isLength({ max: 20 })
        .withMessage('Max Length 20 characters'),
    (0, express_validator_1.check)('instagram')
        .optional()
        .isString()
        .withMessage('Invalid instagram handle')
        .isLength({ max: 20 })
        .withMessage('Max Length 20 characters'),
    (req, res, next) => {
        return (0, handleValidator_1.default)(req, res, next);
    }
];
exports.userValidatorCreate = userValidatorCreate;
const userValidatorUpdate = [
    (0, express_validator_1.check)('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ max: 20 })
        .withMessage('Max Length 20 characters'),
    (0, express_validator_1.check)('userimage').optional().isURL().withMessage('Invalid image URL'),
    (0, express_validator_1.check)('mail').optional().isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('phone').optional().isNumeric().withMessage('Phone must be a number'),
    (0, express_validator_1.check)('birthdate')
        .exists()
        .optional()
        .isISO8601()
        .withMessage('Invalid date format'),
    (0, express_validator_1.check)('twitter')
        .optional()
        .isString()
        .withMessage('Invalid twitter handle')
        .isLength({ max: 20 })
        .withMessage('Max Length 20 characters'),
    (0, express_validator_1.check)('instagram')
        .optional()
        .isString()
        .withMessage('Invalid instagram handle')
        .isLength({ max: 20 })
        .withMessage('Max Length 20 characters'),
    (req, res, next) => {
        return (0, handleValidator_1.default)(req, res, next);
    }
];
exports.userValidatorUpdate = userValidatorUpdate;
const userValidatorDelete = [
    (0, express_validator_1.check)('id').exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return (0, handleValidator_1.default)(req, res, next);
    }
];
exports.userValidatorDelete = userValidatorDelete;
