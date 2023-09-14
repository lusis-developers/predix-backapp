"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const suscription_1 = require("../controllers/suscription");
const router = express_1.default.Router();
router.patch('/suscription', suscription_1.updateSuscription);
router.patch('/remove', suscription_1.removeSuscription);
exports.default = router;
