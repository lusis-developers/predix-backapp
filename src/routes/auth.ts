import express from 'express';

import { authValidatorRegister, authValidatorlogin } from '../validators/auth';
import { authenticateToken } from '../middlewares/HandleBearer';
import {
  createAuthRegisterController,
  authLoginController,
  emailVerificationController
} from '../controllers/auth';

const router = express.Router();

router.post(
  '/auth/register',
  authValidatorRegister,
  createAuthRegisterController
);

router.post('/auth/login', authValidatorlogin, authLoginController);

router.patch(
  '/auth/email-verification',
  authenticateToken,
  emailVerificationController
);

export default router;
