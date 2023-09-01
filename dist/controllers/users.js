"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserImage = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const gcpImageUpload_1 = __importDefault(require("../services/gcpImageUpload"));
const handleErrors_1 = __importDefault(require("../utils/handleErrors"));
const imagesEnum_1 = require("../enum/imagesEnum");
const index_1 = __importDefault(require("../models/index"));
/**
 * Get plans array
 * @param req
 * @param res
 */
async function getUsers(_req, res) {
    try {
        const plans = await index_1.default.users.find({});
        res.send(plans);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get users');
    }
}
exports.getUsers = getUsers;
/**
 * Get a bet item from the database
 * @param req
 * @param res
 */
async function getUser(req, res) {
    try {
        const id = req.params.id;
        const data = await index_1.default.users.findById({ _id: id });
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get user');
    }
}
exports.getUser = getUser;
/**
 * Upload a user image to the database
 * @param req
 * @param res
 */
async function uploadUserImage(req, res) {
    try {
        const { file } = req;
        const result = await (0, gcpImageUpload_1.default)(file, imagesEnum_1.ImagesEnum.USER);
        const fileData = {
            url: result,
            filename: result.split('/')[2]
        };
        const data = await index_1.default.userImages.create(fileData);
        res.send({ data });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Error uploading file');
    }
}
exports.uploadUserImage = uploadUserImage;
/**
 * Create a user item to the database
 * @param req
 * @param res
 */
async function createUser(req, res) {
    const { body } = req;
    try {
        const newuser = await index_1.default.users.create(body);
        res.send(newuser);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot create users');
    }
}
exports.createUser = createUser;
/**
 * Update a user item from the database
 * @param req
 * @param res
 */
async function updateUser(req, res) {
    try {
        const { id, ...body } = (0, express_validator_1.matchedData)(req);
        await index_1.default.users.findByIdAndUpdate(id, body);
        res.send({
            message: 'User updated'
        });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot update user');
    }
}
exports.updateUser = updateUser;
/**
 * Delete an user item from the database
 * @param req
 * @param res
 */
async function deleteUser(req, res) {
    try {
        await index_1.default.users.findOneAndDelete({ _id: req.params.id });
        res.send({ message: 'User deleted successfully' });
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot delete user');
    }
}
exports.deleteUser = deleteUser;
