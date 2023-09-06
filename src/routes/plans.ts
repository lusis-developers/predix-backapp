import express from 'express';

import uploadMiddleware from '../middlewares/handleImage';
import {
  planValidatorCreate,
  planValidatorUpdate,
  planValidatorDelete
} from '../validators/plans';
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  uploadPlanImage
} from '../controllers/plans';

const router = express.Router();
// TODO: endpoint to get plan list
router.get('/plans', getPlans);

// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post(
  '/planImage',
  uploadMiddleware.single('planImage'),
  uploadPlanImage
);
// TODO: endpoint to create plan
router.post('/plan', planValidatorCreate, createPlan);

// TODO: endpoint to update specific plan
router.put('/plan/:id', planValidatorUpdate, updatePlan);

// TODO: endpoint to delete specific plan
router.delete('/plan/:id', planValidatorDelete, deletePlan);

export default router;
