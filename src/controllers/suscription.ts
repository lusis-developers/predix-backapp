import { Request, Response } from 'express';

import handleHttpError from '../utils/handleErrors';
// import models from '../models/index';

async function updateSuscription(req: Request, res: Response) {
  try {
    res.send('hola');
  } catch (error) {
    handleHttpError(res, 'Cannot suscribe');
  }
}

async function removeSuscription(_req: Request, res: Response) {
  try {
    res.send('hola');
  } catch (error) {
    handleHttpError(res, 'Cannot remove suscription');
  }
}

export { updateSuscription, removeSuscription };
