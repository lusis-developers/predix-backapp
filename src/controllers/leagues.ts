import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';
/**
 * Obtener lista de la base de datos
 * @param req
 * @param res
 */
async function getLeagues(_req: Request, res: Response) {
  try {
    const leagues = await models.leagues.find({});
    res.send(leagues);
  } catch (error) {
    handleHttpError(res, 'Cannot get leagues');
  }
}

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
async function createLeague(req: Request, res: Response) {
  const { body } = req;
  try {
    const newleague = await models.leagues.create(body);
    res.send(newleague);
  } catch (error) {
    handleHttpError(res, 'Cannot create leagues');
  }
}

/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
async function updateLeague(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    await models.plans.findByIdAndUpdate(id, body);
    res.send({
      message: 'Plan updated'
    });
  } catch (error) {
    handleHttpError(res, 'Cannot update league');
  }
}

/**
 * Eliminar un elemento de la base de datos
 * @param req
 * @param res
 */
async function deleteLeague(req: Request, res: Response) {
  try {
    await models.leagues.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete league');
  }
}

export { getLeagues, createLeague, updateLeague, deleteLeague };
