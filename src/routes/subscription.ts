import express from 'express';

import {
  updateSubscription,
  removeSubscription
} from '../controllers/suscription';

const router = express.Router();

router.patch('/subscription/:id', updateSubscription);

router.patch('/remove-subscription/:id', removeSubscription);

export default router;
