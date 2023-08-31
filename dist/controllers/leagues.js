"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLeagueImage = exports.deleteLeague = exports.updateLeague = exports.createLeague = exports.getLeagues = void 0;
const express_validator_1 = require("express-validator");
const gcpImageUpload_1 = __importDefault(require("../services/gcpImageUpload"));
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const imagesEnum_1 = require("../enum/imagesEnum");
const index_1 = __importDefault(require("../models/index"));
/**
 * Get a list of leagues items from the database
 * @param req
 * @param res
 */
async function getLeagues(_req, res) {
    try {
        const leagues = await index_1.default.leagues.find({});
        res.send(leagues);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get leagues');
    }
}
exports.getLeagues = getLeagues;
/**
 * Upload a league image to the database
 * @param req
 * @param res
 */
async function uploadLeagueImage(req, res) {
    try {
        const { file } = req;
        const result = await (0, gcpImageUpload_1.default)(file, imagesEnum_1.ImagesEnum.LEAGUE);
        const fileData = {
            url: result,
            filename: result.split('/')[2]
        };
        const data = await index_1.default.leagueImages.create(fileData);
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Error uploading file');
    }
}
exports.uploadLeagueImage = uploadLeagueImage;
/**
 * Create a league item to the database
 * @param req
 * @param res
 */
async function createLeague(req, res) {
    const { body } = req;
    try {
        const newleague = await index_1.default.leagues.create(body);
        res.send(newleague);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot create leagues');
    }
}
exports.createLeague = createLeague;
/**
 * Update a league item from the database
 * @param req
 * @param res
 */
async function updateLeague(req, res) {
    try {
        const { id, ...body } = (0, express_validator_1.matchedData)(req);
        await index_1.default.leagues.findByIdAndUpdate(id, body);
        res.send({
            message: 'League updated'
        });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot update league');
    }
}
exports.updateLeague = updateLeague;
/**
 * Delete an league item from the database
 * @param req
 * @param res
 */
async function deleteLeague(req, res) {
    try {
        await index_1.default.leagues.findOneAndDelete({ _id: req.params.id });
        res.send({ message: 'League deleted successfully' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot delete league');
    }
}
exports.deleteLeague = deleteLeague;
