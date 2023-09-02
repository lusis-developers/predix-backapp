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

// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post(
  '/UserImage',
  uploadMiddleware.single('userImage'),
  uploadUserImage
);

// TODO: get specific user
router.get('/user/:id', getUser);

router.post('/user', userValidatorCreate, createUser);

router.put('/user/:id', userValidatorUpdate, updateUser);

router.delete('/user/:id', userValidatorDelete, deleteUser);

export default router;
