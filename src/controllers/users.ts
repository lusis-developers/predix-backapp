import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import gcpImageUpload from '../services/gcpImageUpload';
import handleHttpError from '../utils/handleErrors';
import { ImagesEnum } from '../enum/imagesEnum';
import models from '../models/index';

/**
 * Get users array
 * @param req
 * @param res
 */
async function getUsers(_req: Request, res: Response) {
  try {
    const users = await models.users.find({});
    res.send(users);
  } catch (error) {
    handleHttpError(res, 'Cannot get users');
  }
}

/**
 * Get a bet item from the database
 * @param req
 * @param res
 */
async function getUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await models.users.findById({ _id: id });
    if (user) {
      user.birthday = user.birthday.toISOString().split('T')[0];
    }
    res.send({ data: user });
  } catch (error) {
    handleHttpError(res, 'Cannot get user');
  }
}

/**
 * Upload a user image to the database
 * @param req
 * @param res
 */
async function uploadUserImage(req: Request, res: Response) {
  try {
    const { file } = req;
    const result = await gcpImageUpload(file!, ImagesEnum.USER);
    const fileData = {
      url: result,
      filename: result.split('/')[2]
    };
    const data = await models.userImages.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error uploading file');
  }
}

/**
 * Create a user item to the database
 * @param req
 * @param res
 */
async function createUser(req: Request, res: Response) {
  const { body } = req;
  try {
    const newuser = await models.users.create(body);
    res.send(newuser);
  } catch (error) {
    handleHttpError(res, 'Cannot create users');
  }
}

/**
 * Update a user item from the database
 * @param req
 * @param res
 */
async function updateUser(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    await models.users.findByIdAndUpdate(id, body);
    res.send({
      message: 'User updated'
    });
  } catch (error) {
    handleHttpError(res, 'Cannot update user');
  }
}

/**
 * Delete an user item from the database
 * @param req
 * @param res
 */
async function deleteUser(req: Request, res: Response) {
  try {
    await models.users.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete user');
  }
}

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage
};
