import express from 'express';

import uploadMiddleware from '../middlewares/handleImage';
import {
  userValidatorCreate,
  userValidatorDelete,
  userValidatorUpdate
} from '../validators/users';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  uploadUserImage
} from '../controllers/users';

const router = express.Router();

router.get('/users', getUsers);

// TODO: endpoint to upload image
// to GCP before create user on POST METHOD
router.post(
  '/UserImage',
  uploadMiddleware.single('userImage'),
  uploadUserImage
);

router.get('/users/:id', getUser);

router.post('/users', userValidatorCreate, createUser);

router.put('/users/:id', userValidatorUpdate, updateUser);

router.delete('/users/:id', userValidatorDelete, deleteUser);

export default router;
