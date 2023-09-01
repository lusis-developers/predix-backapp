"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBetStatus = exports.deleteBet = exports.updateBet = exports.createBet = exports.getBet = exports.getBets = void 0;
const express_validator_1 = require("express-validator");
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const index_1 = __importDefault(require("../models/index"));
/**
 * Get a list of bets items from the database
 * @param req
 * @param res
 */
async function getBets(_req, res) {
    try {
        const bets = await index_1.default.bets.find({});
        res.send(bets);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get bets');
    }
}
exports.getBets = getBets;
/**
 * Get a bet item from the database
 * @param req
 * @param res
 */
async function getBet(req, res) {
    try {
        const id = req.params.id;
        const data = await index_1.default.bets.findById({ _id: id });
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get bet');
    }
}
exports.getBet = getBet;
/**
 * Upload a bet image to the database
 * @param req
 * @param res
 */
async function createBet(req, res) {
    const { body } = req;
    try {
        const newleague = await index_1.default.bets.create(body);
        res.send(newleague);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot create bet');
    }
}
exports.createBet = createBet;
/**
 * Create a bet item to the database
 * @param req
 * @param res
 */
async function updateBet(req, res) {
    try {
        const { id, ...body } = (0, express_validator_1.matchedData)(req);
        await index_1.default.bets.findByIdAndUpdate(id, body);
        res.send({
            message: 'Bet updated'
        });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot update bet');
    }
}
exports.updateBet = updateBet;
/**
 * Update a bet item from the database
 * @param req
 * @param res
 */
async function updateBetStatus(req, res) {
    try {
        const { id, ...body } = (0, express_validator_1.matchedData)(req);
        const status = body.status;
        await index_1.default.bets.findByIdAndUpdate(id, { $set: { status: status } });
        res.send({
            message: 'Bet Status Updated'
        });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot Update Bet Status');
    }
}
exports.updateBetStatus = updateBetStatus;
/**
 * Delete a bet item from the database
 * @param req
 * @param res
 */
async function deleteBet(req, res) {
    try {
        const { id } = (0, express_validator_1.matchedData)(req);
        await index_1.default.bets.findOneAndDelete({ _id: id });
        res.send({ message: 'Bet deleted successfully' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot delete bet');
    }
}
exports.deleteBet = deleteBet;
