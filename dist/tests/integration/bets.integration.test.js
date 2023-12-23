"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
// import bets from '../../routes/bets';
describe('GET /api/bets', () => {
    let api;
    beforeEach(() => {
        const app = (0, app_1.default)();
        api = (0, supertest_1.default)(app);
    });
    it('should return default paginated bets when no query parameters', async () => {
        const response = await api
            .get('/api/bets')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toHaveProperty('bets');
        expect(response.body.bets).toHaveLength(10); // Asumiendo que hay suficientes apuestas
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit', 10);
        expect(response.body).toHaveProperty('page', 1);
    }, 20000);
    it('should handle valid pagination parameters', async () => {
        const response = await api
            .get('/api/bets?limit=5&page=2')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.bets).toHaveLength(5);
        expect(response.body).toHaveProperty('page', 2);
    }, 20000);
    it('should return error for invalid pagination parameters', async () => {
        await api
            .get('/api/bets?limit=-1&page=abc')
            .expect('Content-Type', /json/)
            .expect(400);
    }, 20000);
});
