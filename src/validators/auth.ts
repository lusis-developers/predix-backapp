import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import validateResults from '../utils/handleValidator';

const authValidatorRegister = [
  check('email')
    .notEmpty()
    .withMessage('Mail is required')
    .isEmail()
    .withMessage('Invalid email format'),

  check('password')
    .not()
    .isIn(['password', '123456', 'qwerty'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 8 })
    .withMessage('Min Lenght 8 characters')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string'),

  check('birthdate')
    .exists()
    .notEmpty()
    .isISO8601()
    .withMessage('Date is required'),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  }
];

export { authValidatorRegister };
