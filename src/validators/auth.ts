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
