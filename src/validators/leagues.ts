import { body } from 'express-validator';

export const leagueValidator = [
  
  body('league')
    .notEmpty()
    .isString()
    .withMessage('Name is required')
    .isLength({ max: 20 })
    .withMessage('Max Length 20 characters'),

  body('image')
    .notEmpty()
    .withMessage('Image is required')
    .isURL()
    .withMessage('No image URL')
];