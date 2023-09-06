import express from 'express';

import uploadMiddleware from '../middlewares/handleImage';
import {
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague,
  uploadLeagueImage
} from '../controllers/leagues';
import {
  leagueValidatorCreate,
  leagueValidatorDelete,
  leagueValidatorUpdate
} from '../validators/leagues';

const router = express.Router();

// TODO: endpoint to get league list
router.get('/leagues', getLeagues);

// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post(
  '/leagueImage',
  uploadMiddleware.single('leagueImage'),
  uploadLeagueImage
);

// TODO: endpoint to create new league
router.post('/league', leagueValidatorCreate, createLeague);

// TODO: endpoint to update specific league
router.put('/league/:id', leagueValidatorUpdate, updateLeague);

// TODO: endpoint to delete specific league
router.delete('/league/:id', leagueValidatorDelete, deleteLeague);

export default router;
