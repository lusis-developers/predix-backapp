import jwt from 'jsonwebtoken';

import { UserLoginToken } from '../types/AuthTypes';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

async function tokenSign(user: UserLoginToken) {
  const expiresIn = user.role[0] === 'user' ? '365d' : '7d';

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }

  const sign = await jwt.sign(
    {
      _id: user._id,
      role: user.role[0]
    },
    JWT_SECRET,
    {
      expiresIn: expiresIn
    }
  );

  return sign;
}

export default tokenSign;
