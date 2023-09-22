import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';
import { encrypt, compare } from '../middlewares/handleJwt';
import { UserType } from '../types/AuthTypes';
import { tokenSign } from '../utils/handleJwt';

async function createAuthRegisterController(req: Request, res: Response) {
  try {
    const { body } = req;
    const encryptedPassword = await encrypt(body.password);
    const userData = { ...body, password: encryptedPassword };
    const newAuth = await models.users.create(userData);
    newAuth.set('password', undefined, { strict: false });

    const { role, _id } = newAuth;

    const data = {
      token: await tokenSign({
        role: newAuth.role,
        _id: newAuth.id
      }),
      role,
      _id
    };
    res.send({ data });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Cannot create auth');
  }
}

async function authLoginController(req: Request, res: Response) {
  try {
    const { email, password } = matchedData(req);
    const user = await models.users
      .findOne({ email: email })
      .select('password');
    const userData: UserType | null = await models.users.findOne({
      email: email
    });

    if (!user) {
      handleHttpError(res, 'Usuario no existe');
      return;
    }

    const hashPassword = user.password;
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      handleHttpError(res, 'Password no valido');
      return;
    }

    user.set('password', undefined, { strict: false });

    const data = {
      token: await tokenSign({
        _id: user._id as string,
        role: userData?.role as string[]
      }),
      name: user?.name,
      id: user?._id,
      role: user?.role,
      email: user.email,
      birthdate: user?.birthdate,
      twitter: user?.twitter,
      instagram: user?.instagram,
      susbcriptionStatus: user?.subscriptionStatus,
      subscriptionExpirationDate: user?.subscriptionExpirationDate
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Cannot login');
  }
}

export { createAuthRegisterController, authLoginController };
