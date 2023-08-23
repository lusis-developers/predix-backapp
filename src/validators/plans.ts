import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { body } from 'express-validator';

import validateResults from '../utils/handleValidator';

export const planValidator = [
  body('name')
    .notEmpty()
    .isString()
    .withMessage('Name is required')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Max Length 500 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Only number is allowed'),

  body('image')
    .notEmpty()
    .withMessage('Image is required')
    .isURL()
    .withMessage('No image URL'),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next)
  }
];