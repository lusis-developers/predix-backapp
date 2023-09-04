import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import validateResults from '../utils/handleValidator';

const userValidatorCreate = [
  check('name')
    .notEmpty()
    .isString()
    .withMessage('Name is required')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),
  check('userimage')
    .notEmpty()
    .withMessage('Image is required')
    .isURL()
    .withMessage('Invalid image URL'),
  check('mail')
    .notEmpty()
    .withMessage('Mail is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('phone')
    .notEmpty()
    .withMessage('Phone is required')
    .isString()
    .withMessage('Only number is allowed'),
  check('birthdate')
    .exists()
    .notEmpty()
    .isISO8601()
    .withMessage('Date is required'),
  check('twitter')
    .optional()
    .isString()
    .withMessage('Invalid twitter handle')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),
  check('instagram')
    .optional()
    .isString()
    .withMessage('Invalid instagram handle')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  }
];

const userValidatorUpdate = [
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),
  check('userimage').optional().isURL().withMessage('Invalid image URL'),
  check('mail').optional().isEmail().withMessage('Invalid email format'),
  check('phone').optional().isNumeric().withMessage('Phone must be a number'),
  check('birthdate')
    .exists()
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  check('twitter')
    .optional()
    .isString()
    .withMessage('Invalid twitter handle')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),
  check('instagram')
    .optional()
    .isString()
    .withMessage('Invalid instagram handle')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  }
];

const userValidatorDelete = [
  check('id').exists().notEmpty().isMongoId(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  }
];

export { userValidatorCreate, userValidatorUpdate, userValidatorDelete };
