"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSportImage = exports.deleteSport = exports.updateSport = exports.createSport = exports.getSports = void 0;
const express_validator_1 = require("express-validator");
const gcpImageUpload_1 = __importDefault(require("../services/gcpImageUpload"));
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const imagesEnum_1 = require("../enum/imagesEnum");
const handleImageUrl_1 = require("../utils/handleImageUrl");
const index_1 = __importDefault(require("../models/index"));
async function getSports(_req, res) {
    try {
        const sports = await index_1.default.sports.findAllData();
        res.send(sports);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get sports');
    }
}
exports.getSports = getSports;
async function uploadSportImage(req, res) {
    try {
        const { file } = req;
        const response = await (0, gcpImageUpload_1.default)(file, imagesEnum_1.ImagesEnum.SPORT);
        const result = (0, handleImageUrl_1.addPrefixUrl)(response, imagesEnum_1.ImagesEnum.SPORT);
        const fileData = {
            url: result,
            filename: result.split('/')[2]
        };
        const data = await index_1.default.sportImages.create(fileData);
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Error uploading file');
    }
}
exports.uploadSportImage = uploadSportImage;
async function createSport(req, res) {
    const { body } = req;
    try {
        const newsport = await index_1.default.sports.create(body);
        res.send(newsport);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot create sport');
    }
}
exports.createSport = createSport;
async function updateSport(req, res) {
    try {
        const { id, ...body } = (0, express_validator_1.matchedData)(req);
        await index_1.default.sports.findByIdAndUpdate(id, body);
        res.send({
            message: 'Sport updated'
        });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot update sport');
    }
}
exports.updateSport = updateSport;
async function deleteSport(req, res) {
    try {
        await index_1.default.sports.findOneAndDelete({ _id: req.params.id });
        res.send({ message: 'Sport deleted successfully' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot delete sport');
    }
}
exports.deleteSport = deleteSport;
