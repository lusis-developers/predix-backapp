import { Request, Response } from 'express';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';
import { encrypt } from '../middlewares/handleJwt';
import tokenSign from '../utils/handleJwt';

async function createAuthRegister(req: Request, res: Response) {
  try {
    const { body } = req;
    const encryptedPassword = await encrypt(req.body.password);
    const newBody = { ...body, password: encryptedPassword };
    const newAuth = await models.auth.create(newBody);
    newAuth.set('password', undefined, { strict: false });

    const data = {
      token: await tokenSign(newAuth as any),
      user: newAuth
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Cannot create auth');
  }
}

export { createAuthRegister };
