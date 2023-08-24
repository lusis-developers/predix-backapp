import express from 'express';
import {
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague
} from '../controllers/leagues';
import {
  leagueValidatorCreate,
  leagueValidatorDelete,
  leagueValidatorUpdate
} from '../validators/leagues';

const router = express.Router();

// GET: Recibe todo lo que contiene el league
router.get('/leagues', getLeagues);

// POST: Postea el nuevo league
router.post('/league', leagueValidatorCreate, createLeague);

// PUT: Actualiza un league creado
router.put('/league/:id', leagueValidatorUpdate, updateLeague);

// DELETE: Deletea un league existente
router.delete('/league/:id', leagueValidatorDelete, deleteLeague);

export default router;
