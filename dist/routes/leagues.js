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
// TODO: endpoint to get league list
router.get('/leagues', leagues_1.getLeagues);
// TODO: endpoint to upload image to GCP before createPlan on POST METHOD
router.post('/leagueImage', handleImage_1.default.single('leagueImage'), leagues_1.uploadLeagueImage);
// TODO: endpoint to create new league
router.post('/league', leagues_2.leagueValidatorCreate, leagues_1.createLeague);
// TODO: endpoint to update specific league
router.put('/league/:id', leagues_2.leagueValidatorUpdate, leagues_1.updateLeague);
// TODO: endpoint to delete specific league
router.delete('/league/:id', leagues_2.leagueValidatorDelete, leagues_1.deleteLeague);
exports.default = router;
