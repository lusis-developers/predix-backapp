import { models } from '../models';

/**
 * Obtener lista de la base de datos
 */
const getPlans = async () => {
    try {
        const plans = await models.planModel.find({});
        return plans;
    } catch (error) {
        throw error;
    }
};

/**
 * Crear un nuevo elemento en la base de datos
 * @param planData 
 */
const createPlan = async (planData: any) => {
    const newPlan = new models.planModel(planData);
    try {
        await newPlan.save();
        return newPlan;
    } catch (error) {
        throw error;
    }
};

/**
 * Actualizar un elemento en la base de datos
 * @param id 
 * @param planData 
 */
const updatePlan = async (id: string, planData: any) => {
    try {
        const updatedPlan = await models.planModel.findOneAndUpdate(
            { _id: id }, 
            planData,
            { new: true }
        );
        return updatedPlan;
    } catch (error) {
        throw error;
    }
};

/**
 * Eliminar un elemento de la base de datos
 * @param id 
 */
const deletePlan = async (id: string) => {
    try {
        await models.planModel.findOneAndDelete({ _id: id });
        return { message: "Plan deleted successfully" };
    } catch (error) {
        throw error;
    }
};

export {getPlans, createPlan, updatePlan, deletePlan};
