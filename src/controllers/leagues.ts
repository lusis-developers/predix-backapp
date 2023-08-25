import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import gcpImageUpload from '../services/gcpImageUpload';
import handleHttpError from '../utils/handleErrors';
import models from '../models/index';

async function getLeagues(_req: Request, res: Response) {
  try {
    const leagues = await models.leagues.find({});
    res.send(leagues);
  } catch (error) {
    handleHttpError(res, 'Cannot get leagues');
  }
}

async function uploadLeagueImage(req: Request, res: Response) {
  try {
    const { file } = req;
    const result = await gcpImageUpload(file!, 'league');
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

async function createLeague(req: Request, res: Response) {
  const { body } = req;
  try {
    const newleague = await models.leagues.create(body);
    res.send(newleague);
  } catch (error) {
    handleHttpError(res, 'Cannot create leagues');
  }
}

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

async function deleteLeague(req: Request, res: Response) {
  try {
    await models.leagues.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'DELETED_SUCCESFULLY' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete league');
  }
}

export {
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague,
  uploadLeagueImage
};
