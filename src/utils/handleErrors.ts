import { Response } from 'express';

function handleHttpError(
  res: Response,
  message = 'Oops, somethins happened',
  code = 403
): void {
  res.status(code);
  res.send({ error: message });
}

export default handleHttpError;
