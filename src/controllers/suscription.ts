import { Request, Response } from 'express';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';

async function updateSubscription(req: Request, res: Response) {
  try {
    const id = req.params.id;

    await models.users.findByIdAndUpdate(id, {
      $set: {
        subscriptionStatus: true,
        subscriptionExpirationDate: new Date().toISOString()
      }
    });

    res.send({ message: 'Subscribe Successfully' });
  } catch (error) {
    handleHttpError(res, 'Cannot suscribe');
  }
}

async function removeSubscription(req: Request, res: Response) {
  try {
    const id = req.params.id;

    await models.users.findByIdAndUpdate(id, {
      $set: {
        subscriptionStatus: false,
        subscriptionExpirationDate: null
      }
    });

    res.send({ message: 'Subscribe Removed Successfully' });
  } catch (error) {
    handleHttpError(res, 'Cannot remove suscription');
  }
}

export { updateSubscription, removeSubscription };
