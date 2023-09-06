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

// TODO: endpoint to get users list
router.get('/users', getUsers);

// TODO: endpoint to upload image
// to GCP before createPlan on POST METHOD
router.post(
  '/UserImage',
  uploadMiddleware.single('userImage'),
  uploadUserImage
);

// TODO: get specific user
router.get('/users/:id', getUser);

// TODO: endpoint to create new user
router.post('/users', userValidatorCreate, createUser);

// TODO: endpoint to update specific user
router.put('/users/:id', userValidatorUpdate, updateUser);

// TODO: endpoint to delete specific user
router.delete('/users/:id', userValidatorDelete, deleteUser);

export default router;
