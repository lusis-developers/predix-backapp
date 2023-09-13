import jwt from 'jsonwebtoken';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

async function tokenSign(user: { _id: string; role: string }) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }

  const sign = await jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }
  );

  return sign;
}

export default tokenSign;
