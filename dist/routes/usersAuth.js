"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersAuth_1 = require("../validators/usersAuth");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post('/register', usersAuth_1.userValidatorCreate, auth_1.createUser);
exports.default = router;
