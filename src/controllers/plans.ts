import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import models from '../models/index';
import handleHttpError from '../utils/handleErrors';

/**
 * Obtener lista de la base de datos
 * @param req
 * @param res
 */
const getPlans = async (_req: Request, res: Response) => {
  try {
    const plans = await models.plans.find({});
    res.send(plans);
  } catch (error) {
    handleHttpError(res, 'Cannot get plans');
  }
};

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
const createPlan = async (req: Request, res: Response) => {
  const{ body } = matchedData(req)
  try {
    const newPlan = await models.plans.create(body);
    res.send(newPlan);
  } catch (error) {
    handleHttpError(res, 'Cannot create plan');
  }
};


/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
const updatePlan = async (req: Request, res: Response) => {
  try {
    const { id, ...body } = matchedData(req)
    await models.plans.findByIdAndUpdate(
      id,
      body
    );
    res.send({
      message: 'Plan updated',
    });
  } catch (error) {
    handleHttpError(res, 'Cannot update plan');
  }
};

/**
 * Eliminar un elemento de la base de datos
 * @param req
 * @param res
 */
const deletePlan = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req)
    await models.plans.findOneAndDelete({ _id: id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete plan');
  }
};

export { getPlans, createPlan, updatePlan, deletePlan };
