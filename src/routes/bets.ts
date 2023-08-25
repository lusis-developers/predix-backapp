import express from 'express';

// import {
//   planValidatorCreate,
//   planValidatorUpdate,
//   planValidatorDelete
// } from '../validators/plans';
import {
  getBet,
  getBets,
  updateBet,
  deleteBet,
  createBet
} from '../controllers/bets';

const router = express.Router();

router.get('/plans', getBets);

router.get('/plan/:id', getBet);

router.post('/plan', createBet);

router.put('/plan/:id', updateBet);

router.patch('/plan/:id', updateBet);

router.delete('/plan/:id', deleteBet);

export default router;
