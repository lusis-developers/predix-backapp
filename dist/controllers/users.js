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
const handleImageUrl_1 = require("../utils/handleImageUrl");
const index_1 = __importDefault(require("../models/index"));
async function getUsers(_req, res) {
    try {
        const users = await index_1.default.users.find({});
        res.send(users);
    }
    catch (error) {
        (0, handleErrors_1.default)(res, 'Cannot get users');
    }
}
exports.getUsers = getUsers;
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
async function uploadUserImage(req, res) {
    try {
        const { file } = req;
        const response = await (0, gcpImageUpload_1.default)(file, imagesEnum_1.ImagesEnum.USER);
        const result = (0, handleImageUrl_1.addPrefixUrl)(response, imagesEnum_1.ImagesEnum.USER);
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
