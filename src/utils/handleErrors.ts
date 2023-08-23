import { Response } from 'express';

function handleHttpError(res: Response, message = 'Oops, somethins happened', code = 304): void {
  res.status(code);
  res.send({ error: message });
};

export default handleHttpError;