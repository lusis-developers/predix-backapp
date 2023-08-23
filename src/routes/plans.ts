import express from 'express';

import { planValidatorCreate, planValidatorUpdate, planValidatorDelete } from '../validators/plans';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/plans';

const router = express.Router();

router.get('/plans', getPlans);

router.post('/plan', planValidatorCreate,createPlan);

router.put('/plan/:id', planValidatorUpdate, updatePlan);

router.delete('/plan/:id', planValidatorDelete, deletePlan);

export default router;