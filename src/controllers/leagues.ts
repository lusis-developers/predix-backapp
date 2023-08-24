import { Request, Response } from 'express';
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
    res.status(501).send(error);
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
    res.status(409).send(error);
  }
}

/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
async function updateLeague(req: Request, res: Response) {
  try {
    const updatedleagues = await models.leagues.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send({
      message: 'UPDATED_SUCCESFULLY',
      updatedplans: updatedleagues
    });
  } catch (error) {
    res.status(403).send(error);
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
    res.status(403).send(error);
  }
}

export { getLeagues, createLeague, updateLeague, deleteLeague };
