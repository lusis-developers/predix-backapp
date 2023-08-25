import express from 'express';

import uploadMiddleware from '../middlewares/handleImage';
import {
  getSports,
  createSport,
  updateSport,
  deleteSport,
  uploadSportImage
} from '../controllers/sports';
import {
  sportValidatorCreate,
  sportValidatorDelete,
  sportValidatorUpdate
} from '../validators/sports';

const router = express.Router();

// GET: Recibe todo lo que contiene el Sport
router.get('/sports', getSports);

// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post(
  '/sportImage',
  uploadMiddleware.single('sportImage'),
  uploadSportImage
);

// POST: Postea el nuevo Sport
router.post('/sport', sportValidatorCreate, createSport);

// PUT: Actualiza un sport creado
router.put('/sport/:id', sportValidatorUpdate, updateSport);

// DELETE: Deletea un bet existente
router.delete('/sport/:id', sportValidatorDelete, deleteSport);

export default router;
