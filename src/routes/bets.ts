import express from 'express';

import {
  betStatusUpdateValidator,
  betValidatorCreate,
  betValidatorDelete,
  betValidatorUpdate
} from '../validators/bets';
import {
  getBet,
  getBetsPendings,
  getBetsFree,
  getBets,
  updateBet,
  deleteBet,
  createBet,
  updateBetStatus
} from '../controllers/bets';

const router = express.Router();

router.get('/bets', getBets);
// TODO: get status bets
router.get('/bets/pendings', getBetsPendings);
//TODO: get free bets
router.get('/bets/isfree', getBetsFree);

// TODO: get specific plan
router.get('/bets/:id', getBet);

router.post('/bets', betValidatorCreate, createBet);

router.put('/bets/:id', betValidatorUpdate, updateBet);

// TODO: update the bet status
router.patch('/bets/:id', betStatusUpdateValidator, updateBetStatus);

router.delete('/bets/:id', betValidatorDelete, deleteBet);

export default router;
