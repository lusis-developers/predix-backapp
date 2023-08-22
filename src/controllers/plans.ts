import { Request, Response } from 'express';
import models from '../models/index';

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
    res.status(501).send(error);
  }
};

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
const createPlan = async (req: Request, res: Response) => {
  const newplans = new models.plans(req.body);
  try {
    await newplans.save();
    res.send(newplans);
  } catch (error) {
    res.status(409).send(error);
  }
};

/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
const updatePlan = async (req: Request, res: Response) => {
  try {
    const updatedplans = await models.plans.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send({
      message: 'UPDATED_SUCCESFULLY',
      updatedplans: updatedplans,
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
const deletePlan = async (req: Request, res: Response) => {
  try {
    await models.plans.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    res.status(403).send(error);
  }
};

export { getPlans, createPlan, updatePlan, deletePlan };
