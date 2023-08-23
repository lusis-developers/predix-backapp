import express from 'express';

import { planValidatorCreate, planValidatorUpdate, planValidatorDelete } from '../validators/plans';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/plans';

const router = express.Router();

// GET: Recibe todo lo que contiene el plan
router.get('/plans', getPlans);

// POST: Postea el nuevo plan
router.post('/plan', planValidatorCreate,createPlan);

// PUT: Actualiza un plan creado
router.put('/plan/:id', planValidatorUpdate, updatePlan);

// DELETE: Deletea un plan existente
router.delete('/plan/:id', planValidatorDelete,deletePlan);

export default router;