import { Router, Request, Response } from 'express';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/plans';

const router = Router();

// GET: Recibe todo lo que contiene el plan
router.get('/plan', getPlans);

// POST: Postea el nuevo plan
router.post('/plan', createPlan);

// PUT: Actualiza un plan creado
router.put('/plan/:id', updatePlan);

// DELETE: Deletea un plan existente
router.delete('/plan/:id', deletePlan);

export default router;