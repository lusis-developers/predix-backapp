"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// import { sendMassiveVerificationEmail } from './scripts/EmailVerification';
function createApp() {
    const app = (0, express_1.default)();
    const whiteList = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://predix.ec'
    ];
    app.use((0, cors_1.default)({ origin: whiteList }));
    app.use(express_1.default.json());
    // sendMassiveVerificationEmail();
    app.get('/', (_req, res) => {
        res.send('Predix is online');
    });
    (0, routes_1.default)(app);
    return app;
}
exports.default = createApp;
