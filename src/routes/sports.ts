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

// TODO: endpoint to get sport list
router.get('/sports', getSports);

// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post(
  '/sportImage',
  uploadMiddleware.single('sportImage'),
  uploadSportImage
);

// TODO: endpoint to create new sport
router.post('/sport', sportValidatorCreate, createSport);

// TODO: endpoint to update specific sport
router.put('/sport/:id', sportValidatorUpdate, updateSport);

// TODO: endpoint to delete specific sport
router.delete('/sport/:id', sportValidatorDelete, deleteSport);

export default router;
