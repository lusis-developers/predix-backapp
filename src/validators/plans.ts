import { body } from 'express-validator';

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
    .withMessage('Only number allowed'),

  body('image')
    .notEmpty()
    .withMessage('Image required')
    .isURL()
    .withMessage('No image URL')

];