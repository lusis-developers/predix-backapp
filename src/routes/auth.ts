import express from 'express';

import { authValidatorRegister } from '../validators/auth';
import { createAuthRegister } from '../controllers/auth';

const router = express.Router();

router.post('/auth/register', authValidatorRegister, createAuthRegister);

export default router;
