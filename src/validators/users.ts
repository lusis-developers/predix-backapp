import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import validateResults from '../utils/handleValidator';

const userValidatorUpdate = [
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),

  check('lastname')
    .optional()
    .isString()
    .withMessage('LastName is required')
    .isLength({ max: 30 })
    .withMessage('Max Length 30 characters'),

  check('userImage').optional().isURL().withMessage('Invalid image URL'),

  check('email').optional().isEmail().withMessage('Invalid email format'),

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

export { userValidatorUpdate };
