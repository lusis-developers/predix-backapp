import { Request, Response } from 'express';
import models from '../models/index';
import handleHttpError from  '../utils/handleErrors'


/**
 * Obtener lista de la base de datos
 * @param req
 * @param res
 */
async function getSports (_req: Request, res: Response) {
  try {
    const sports = await models.sports.findAllData();
    res.send(sports);
  } catch (error) {
    handleHttpError(res, 'Cannot get sports');
  }
};

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
async function createSport (req: Request, res: Response) {
  const { body } = req
  try {
    const newsport = await models.sports.create(body);
    res.send(newsport);
  } catch (error) {
    handleHttpError(res, 'Cannot create sport');
  }
};


/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
async function updateSport (req: Request, res: Response) {
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
    handleHttpError(res, 'Cannot update sport');
  }
};

/**
 * Eliminar un elemento de la base de datos
 * @param req
 * @param res
 */
async function deleteSport (req: Request, res: Response) {
  try {
    await models.sports.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete sport');
  }
};

export { getSports, createSport, updateSport, deleteSport };
