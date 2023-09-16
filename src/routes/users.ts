import express from 'express';

import uploadMiddleware from '../middlewares/handleImage';
import { userValidatorUpdate } from '../validators/users';
import { getUsers, updateUser, uploadUserImage } from '../controllers/users';

const router = express.Router();

router.get('/users', getUsers);

// TODO: endpoint to upload image
// to GCP before create user on POST METHOD
router.post(
  '/UserImage',
  uploadMiddleware.single('userImage'),
  uploadUserImage
);

router.patch('/users/:id', userValidatorUpdate, updateUser);

router.get('/users', getUsers);

export default router;
