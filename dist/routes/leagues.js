"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleImage_1 = __importDefault(require("../middlewares/handleImage"));
const leagues_1 = require("../controllers/leagues");
const leagues_2 = require("../validators/leagues");
const router = express_1.default.Router();
// GET: Recibe todo lo que contiene el league
router.get('/leagues', leagues_1.getLeagues);
router.post('/leagueImage', handleImage_1.default.single('leagueImage'), leagues_1.uploadLeagueImage);
// POST: Postea el nuevo league
router.post('/league', leagues_2.leagueValidatorCreate, leagues_1.createLeague);
// PUT: Actualiza un league creado
router.put('/league/:id', leagues_2.leagueValidatorUpdate, leagues_1.updateLeague);
// DELETE: Deletea un league existente
router.delete('/league/:id', leagues_2.leagueValidatorDelete, leagues_1.deleteLeague);
exports.default = router;
