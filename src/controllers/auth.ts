import { Request, Response } from 'express';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';
async function createAuthRegister(req: Request, res: Response) {
  const { body } = req;
  try {
    const newauth = await models.auth.create(body);
    res.send(newauth);
  } catch (error) {
    handleHttpError(res, 'Cannot create auth');
  }
}

export { createAuthRegister };
