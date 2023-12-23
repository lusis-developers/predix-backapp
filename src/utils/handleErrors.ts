import { Response } from 'express';

function handleHttpError(
  res: Response,
  message: string = 'Oops, something happened',
  code: number = 500
): void {
  res.status(code);
  res.send({ message: message });
}

export default handleHttpError;
