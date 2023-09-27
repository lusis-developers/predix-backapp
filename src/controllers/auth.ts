import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';
import { encrypt, compare } from '../middlewares/handleJwt';
import { UserType } from '../types/AuthTypes';
import { tokenSign } from '../utils/handleJwt';
import { sendEmail } from '../services/sendGrid';
import { generateEmailVerificationTemplate } from '../emails/EmailVerification';
// import { generatePasswordRecoveryTemplate } from '../emails/PasswordRecovery';

async function createAuthRegisterController(req: Request, res: Response) {
  try {
    const { body } = req;
    const email = body.email;
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

    const token = `https://predix.ec/${data.token}`;

    const verificationBody = generateEmailVerificationTemplate(token);

    sendEmail(email, 'VERIFICATION EMAIL', verificationBody);
    res.send({ data });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Cannot create user', 401);
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
      handleHttpError(res, 'User or password are not valid', 401);
      return;
    }

    const hashPassword = user.password;
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      handleHttpError(res, 'User or password are not valid', 401);
      return;
    }

    user.set('password', undefined, { strict: false });

    const data = {
      token: await tokenSign({
        _id: user._id as string,
        role: userData?.role as string[]
      }),
      name: userData?.name,
      id: userData?._id,
      role: userData?.role,
      email: userData?.email,
      birthdate: userData?.birthdate,
      twitter: userData?.twitter,
      instagram: userData?.instagram,
      susbcriptionStatus: userData?.subscriptionStatus,
      subscriptionExpirationDate: userData?.subscriptionExpirationDate
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Cannot auth user', 401);
  }
}

async function emailVerificationController(req: Request, res: Response) {
  try {
    const id = req.body.id;

    const user = await models.users.findById(id);

    if (!user) {
      handleHttpError(res, 'User do not exist', 402);
      return;
    }

    await models.users.findByIdAndUpdate(id, {
      $set: {
        emailVerified: true
      }
    });

    res.send({ message: 'User verified' });
  } catch (error) {
    handleHttpError(res, 'Cannot verify user', 401);
  }
}

export {
  createAuthRegisterController,
  authLoginController,
  emailVerificationController
};
