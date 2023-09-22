"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSubscription = exports.updateSubscription = void 0;
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const index_1 = __importDefault(require("../models/index"));
async function updateSubscription(req, res) {
    try {
        const userId = req.body.id;
        const planId = req.body.planId;
        const plan = await index_1.default.plans.findById(planId);
        console.log(userId);
        console.log(plan);
        // await models.users.findByIdAndUpdate(id, {
        //   $set: {
        //     subscriptionStatus: true,
        //     subscriptionExpirationDate: new Date().toISOString()
        //   }
        // });
        res.send({ message: 'Subscribe Successfully' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot suscribe');
    }
}
exports.updateSubscription = updateSubscription;
async function removeSubscription(req, res) {
    try {
        const id = req.params.id;
        await index_1.default.users.findByIdAndUpdate(id, {
            $set: {
                subscriptionStatus: false,
                subscriptionExpirationDate: null
            }
        });
        res.send({ message: 'Subscribe Removed Successfully' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot remove suscription');
    }
}
exports.removeSubscription = removeSubscription;
