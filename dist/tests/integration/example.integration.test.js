"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const example_1 = __importDefault(require("../../routes/example"));
const app = (0, express_1.default)();
app.use(example_1.default);
describe('Example endpoint test', () => {
    it('Should respond with Predix is online, this is an example', async () => {
        await (0, supertest_1.default)(app)
            .get('/example')
            .expect('Content-Type', /text/)
            .expect(200, 'Predix is online, this is an example');
    });
});
