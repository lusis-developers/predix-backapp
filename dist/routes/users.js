"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleImage_1 = __importDefault(require("../middlewares/handleImage"));
const users_1 = require("../validators/users");
const users_2 = require("../controllers/users");
const router = express_1.default.Router();
router.get('/users', users_2.getUsers);
// TODO: endpoint to upload image
// to GCP before create user on POST METHOD
router.post('/UserImage', handleImage_1.default.single('userImage'), users_2.uploadUserImage);
router.patch('/users/:id', users_1.userValidatorUpdate, users_2.updateUser);
router.get('/users/profile', users_2.getUsers);
exports.default = router;
