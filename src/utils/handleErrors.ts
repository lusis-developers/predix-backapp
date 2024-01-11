import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';

function handleHttpError(
  res: Response,
  message: string = 'Oops, something happened',
  code: number = 443
): void {
  res.status(code);
  res.send({ message: message });
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large' });
  }
  next(err);
};

export default handleHttpError;
