import { Router, Request, Response } from 'express';
import { getBetinfo, createBetinfo, updateBetinfo, deleteBetinfo } from '../controllers/plan';

const router = Router();

// GET: Recibe todo lo que contiene el plan
router.get('/plan', getBetinfo);

// POST: Postea el nuevo plan
router.post('/plan', createBetinfo);

// PUT: Actualiza un plan creado
router.put('/plan/:id', updateBetinfo);

// DELETE: Deletea un plan existente
router.delete('/plan/:id', deleteBetinfo);

export default router;
