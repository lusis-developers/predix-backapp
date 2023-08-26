import { Request, Response } from 'express';
import { matchedData } from 'express-validator';

import handleHttpError from '../utils/handleErrors';
import models from '../models/index';

async function getBets(_req: Request, res: Response) {
  try {
    const bets = await models.bets.find({});
    res.send(bets);
  } catch (error) {
    handleHttpError(res, 'Cannot get bets');
  }
}

async function getBet(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = await models.bets.findById({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Cannot get bet');
  }
}

async function createBet(req: Request, res: Response) {
  const { body } = req;
  try {
    const newleague = await models.bets.create(body);
    res.send(newleague);
  } catch (error) {
    handleHttpError(res, 'Cannot create bet');
  }
}

async function updateBet(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    await models.bets.findByIdAndUpdate(id, body);
    res.send({
      message: 'Bet updated'
    });
  } catch (error) {
    handleHttpError(res, 'Cannot update bet');
  }
}

async function updateBetStatus(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    const status = body.status;

    await models.bets.findByIdAndUpdate(id, { $set: { status: status } });

    res.send({
      message: 'Bet Status Updated'
    });
  } catch (error) {
    handleHttpError(res, 'Cannot Update Bet Status');
  }
}

async function deleteBet(req: Request, res: Response) {
  try {
    await models.leagues.findOneAndDelete({ _id: req.params.id });
    res.send({ message: 'Bet deleted' });
  } catch (error) {
    handleHttpError(res, 'Cannot delete bet');
  }
}

export { getBets, getBet, createBet, updateBet, deleteBet, updateBetStatus };
