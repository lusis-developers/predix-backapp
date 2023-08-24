import express from 'express';

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

router.get('/plans', getPlans);

// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post('/planImage', uploadPlanImage);

router.post('/plan', planValidatorCreate, createPlan);

router.put('/plan/:id', planValidatorUpdate, updatePlan);

router.delete('/plan/:id', planValidatorDelete, deletePlan);

export default router;
