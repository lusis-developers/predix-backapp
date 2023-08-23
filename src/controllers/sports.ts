import { Request, Response } from 'express';
import models from '../models/index';

/**
 * Obtener lista de la base de datos
 * @param req
 * @param res
 */
const getSports = async (_req: Request, res: Response) => {
  try {
    const sports = await models.sports.find({});
    res.send(sports);
  } catch (error) {
    res.status(501).send(error);
  }
};

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
const createSport = async (req: Request, res: Response) => {
  const { body } = req
  try {
    const newsport = await models.sports.create(body);
    res.send(newsport);
  } catch (error) {
    res.status(409).send(error);
  }
};


/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
const updateSport = async (req: Request, res: Response) => {
  try {
    const updatedsports = await models.sports.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send({
      message: 'UPDATED_SUCCESFULLY',
      updatedplans: updatedsports,
    });
  } catch (error) {
    res.status(403).send(error);
  }
};

/**
 * Eliminar un elemento de la base de datos
 * @param req
 * @param res
 */
const deleteSport = async (req: Request, res: Response) => {
  try {
    await models.sports.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    res.status(403).send(error);
  }
};

export { getSports, createSport, updateSport, deleteSport };
