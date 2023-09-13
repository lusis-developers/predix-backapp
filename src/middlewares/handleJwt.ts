import bcryptjs from 'bcryptjs';

const encrypt = async (passwordPlain: string) => {
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

export { encrypt };
