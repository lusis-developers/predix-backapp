import express from 'express';

import {
  userValidatorCreate,
  userValidatorDelete,
  userValidatorUpdate
} from '../validators/users';
import {
  getUser,
  updateUser,
  deleteUser,
  createUser
} from '../controllers/users';

const router = express.Router();

// TODO: get specific user
router.get('/users/:id', getUser);

router.post('/users', userValidatorCreate, createUser);

router.put('/users/:id', userValidatorUpdate, updateUser);

router.delete('/users/:id', userValidatorDelete, deleteUser);

export default router;
