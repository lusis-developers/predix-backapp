import express from 'express';
import { getSports, createSport, updateSport, deleteSport } from '../controllers/sports';

const router = express.Router();

// GET: Recibe todo lo que contiene el Sport
router.get('/sports', getSports);

// POST: Postea el nuevo Sport
router.post('/sport', createSport);

// PUT: Actualiza un bet creado
router.put('/sport/:id', updateSport);

// DELETE: Deletea un bet existente
router.delete('/sport/:id', deleteSport);

export default router;