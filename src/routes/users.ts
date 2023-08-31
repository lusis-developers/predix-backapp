import express from 'express';

import uploadMiddleware from '../middlewares/handleImage';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage
} from '../controllers/users';
import {
  userValidatorCreate,
  userValidatorDelete,
  userValidatorUpdate
} from '../validators/users';

const router = express.Router();

// GET: Recibe todo lo que contiene el user
router.get('/users', getUsers);

router.post(
  '/userImage',
  uploadMiddleware.single('userImage'),
  uploadUserImage
);

// POST: Postea el nuevo user
router.post('/user', userValidatorCreate, createUser);

// PUT: Actualiza un user creado
router.put('/user/:id', userValidatorUpdate, updateUser);

// DELETE: Deletea un user existente
router.delete('/user/:id', userValidatorDelete, deleteUser);

export default router;
