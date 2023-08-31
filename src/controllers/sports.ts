import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import gcpImageUpload from '../services/gcpImageUpload';
import handleHttpError from '../utils/handleErrors';
import { ImagesEnum } from '../enum/imagesEnum';
import models from '../models/index';
/**
 * Obtain sport list from database
 * @param req
 * @param res
 */
async function getSports(_req: Request, res: Response) {
  try {
    const sports = await models.sports.findAllData();
    res.send(sports);
  } catch (error) {
    handleHttpError(res, 'Cannot get sports');
  }
}

/**
 * Upload image before creating sport item
 * @param req
 * @param res
 */
async function uploadSportImage(req: Request, res: Response) {
  try {
    const { file } = req;
    const result = await gcpImageUpload(file!, ImagesEnum.SPORT);
    const fileData = {
      url: result,
      filename: result.split('/')[2]
    };
    const data = await models.sportImages.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error uploading file');
  }
}

/**
 * Create a new sport item in the database
 * @param req
 * @param res
 */
async function createSport(req: Request, res: Response) {
  const { body } = req;
  try {
    const newsport = await models.sports.create(body);
    res.send(newsport);
  } catch (error) {
    handleHttpError(res, 'Cannot create sport');
  }
}

/**
 * Update an sport item in the database
 * @param req
 * @param res
 */
async function updateSport(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    await models.plans.findByIdAndUpdate(id, body);
    res.send({
      message: 'Sport updated'
    });
  } catch (error) {
    handleHttpError(res, 'Cannot update sport');
  }
}

/**
 * Delete an sport item from the database
 * @param req
 * @param res
 */
async function deleteSport(req: Request, res: Response) {
  try {
    await models.sports.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete sport');
  }
}

export { getSports, createSport, updateSport, deleteSport, uploadSportImage };
