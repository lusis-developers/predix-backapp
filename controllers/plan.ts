import { Request, Response } from 'express';
import { models } from '../models';

/**
 * Obtener lista de la base de datos
 * @param req 
 * @param res 
 */
const getBetinfo = async (req: Request, res: Response) => {
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
const createBetinfo = async (req: Request, res: Response) => {
    const newplan = new models.planModel(req.body);
    try {
        await newplan.save();
        res.send(newplan);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * Actualizar un elemento en la base de datos
 * @param req 
 * @param res 
 */
const updateBetinfo = async (req: Request, res: Response) => {
    try {
        const updatedplan = await models.planModel.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body,
            { new: true }
        );
        res.send({
            message: "Se actualizo el plan de apuesta exitosamente",
            updatedPlan: updatedplan
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
const deleteBetinfo = async (req: Request, res: Response) => {
    try {
        await models.planModel.findOneAndDelete({ _id: req.params.id });
        res.send({ message: "Se borro el plan de apuesta exitosamente" });
    } catch (error) {
        res.status(500).send(error);
    }
};

export {getBetinfo, createBetinfo, updateBetinfo, deleteBetinfo};
