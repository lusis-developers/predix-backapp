import { Request, Response } from "express";
import { models } from "../models/index";

/**
 * Obtener lista de la base de datos
 * @param req
 * @param res
 */
const getPlans = async (_req: Request, res: Response) => {
  try {
    const plans = await models.planModel.find({});
    res.send(plans);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Crear un nuevo elemento en la base de datos
 * @param req
 * @param res
 */
const createPlan = async (req: Request, res: Response) => {
  const newplans = new models.planModel(req.body);
  try {
    await newplans.save();
    res.send(newplans);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Actualizar un elemento en la base de datos
 * @param req
 * @param res
 */
const updatePlan = async (req: Request, res: Response) => {
  try {
    const updatedplans = await models.planModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send({
      message: "Se actualizo el plans de apuesta exitosamente",
      updatedplans: updatedplans,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Eliminar un elemento de la base de datos
 * @param req
 * @param res
 */
const deletePlan = async (req: Request, res: Response) => {
  try {
    await models.planModel.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Se borro el plans de apuesta exitosamente" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getPlans, createPlan, updatePlan, deletePlan };
