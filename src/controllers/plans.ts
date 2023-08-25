import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import gcpImageUpload from '../services/gcpImageUpload';
import handleHttpError from '../utils/handleErrors';
import models from '../models/index';

/**
 * Get plan array
 * @param req
 * @param res
 */
async function getPlans(_req: Request, res: Response) {
  try {
    const plans = await models.plans.find({});
    res.send(plans);
  } catch (error) {
    handleHttpError(res, 'Cannot get plans');
  }
}

/**
 * Upload image before creating plan item
 * @param req
 * @param res
 */
async function uploadPlanImage(req: Request, res: Response) {
  try {
    const { file } = req;
    const result = await gcpImageUpload(file!, 'plans');
    const fileData = {
      url: result,
      filename: result.split('/')[2]
    };
    const data = await models.planImages.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error uploading file');
  }
}

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
async function createPlan(req: Request, res: Response) {
  const { body } = req;
  try {
    const newPlan = await models.plans.create(body);
    res.send(newPlan);
  } catch (error) {
    handleHttpError(res, 'Cannot create plan');
  }
}

/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
async function updatePlan(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    await models.plans.findByIdAndUpdate(id, body);
    res.send({
      message: 'Plan updated'
    });
  } catch (error) {
    handleHttpError(res, 'Cannot update plan');
  }
}

/**
 * Eliminar un elemento de la base de datos
 * @param req
 * @param res
 */
async function deletePlan(req: Request, res: Response) {
  try {
    const { id } = matchedData(req);
    await models.plans.findOneAndDelete({ _id: id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete plan');
  }
}

export { getPlans, createPlan, updatePlan, deletePlan, uploadPlanImage };
