import { body } from 'express-validator';

export const planValidator = [
  body('nombre')
    .notEmpty()
    .isString()
    .withMessage('El nombre del plan es requerido')
    .isLength({ max: 20 })
    .withMessage('Maximo 20 letras'),

  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isLength({ max: 100 })
    .withMessage('La descripción debe de ser menos de 100 letras'),

  body('precio')
    .notEmpty()
    .withMessage('$0.00')
    .isNumeric()
    .withMessage('El precio es requerido'),

  body('image')
    .notEmpty()
    .withMessage('Elige o sube una imagen')
    .isURL()
    .withMessage('La imagen debe de ser un URL')

];
