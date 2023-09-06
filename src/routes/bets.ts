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

// TODO: get all bets
router.get('/bets', getBets);

// TODO: get status bets
router.get('/bets/pendings', getBetsPendings);

//TODO: get free bets
router.get('/bets/is-free', getBetsFree);

// TODO: get specific bet
router.get('/bets/:id', getBet);

//TODO: post bet
router.post('/bets', betValidatorCreate, createBet);

//TODO: update specific bet
router.put('/bets/:id', betValidatorUpdate, updateBet);

// TODO: update the bet status
router.patch('/bets/:id', betStatusUpdateValidator, updateBetStatus);

//TODO: delete specific bet
router.delete('/bets/:id', betValidatorDelete, deleteBet);

export default router;
