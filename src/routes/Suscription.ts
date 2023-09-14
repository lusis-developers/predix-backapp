import express from 'express';

import {
  updateSuscription,
  removeSuscription
} from '../controllers/suscription';

const router = express.Router();

router.patch('/suscription', updateSuscription);

router.patch('/remove', removeSuscription);

export default router;
