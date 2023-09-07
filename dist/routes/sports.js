"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleImage_1 = __importDefault(require("../middlewares/handleImage"));
const sports_1 = require("../controllers/sports");
const sports_2 = require("../validators/sports");
const router = express_1.default.Router();
router.get('/sports', sports_1.getSports);
// TODO: endpoint to upload image to GCP before create sports on POST METHOD
router.post('/sportImage', handleImage_1.default.single('sportImage'), sports_1.uploadSportImage);
router.post('/sport', sports_2.sportValidatorCreate, sports_1.createSport);
router.put('/sport/:id', sports_2.sportValidatorUpdate, sports_1.updateSport);
router.delete('/sport/:id', sports_2.sportValidatorDelete, sports_1.deleteSport);
exports.default = router;
