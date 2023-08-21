import express from 'express';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/plans';

const router = express.Router();

// GET: Recibe todo lo que contiene el plan
router.get('/plans', getPlans);

// POST: Postea el nuevo plan
router.post('/plan', createPlan);

// PUT: Actualiza un plan creado
router.put('/plan/:id', updatePlan);

// DELETE: Deletea un plan existente
router.delete('/plan/:id', deletePlan);

export default router;