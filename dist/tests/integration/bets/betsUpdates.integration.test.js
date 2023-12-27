"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../../app"));
const mongo_1 = __importDefault(require("../../../config/mongo"));
describe('PATCH /bets/:id', () => {
    let app;
    const betId = '658728515ce1200d553447c3';
    const invalidBetId = '0000fc00f000b00ea170';
    beforeAll(async () => {
        await (0, mongo_1.default)();
    });
    beforeEach(() => {
        app = (0, app_1.default)();
    });
    it('Should return the status updated successfully', async () => {
        const response = await (0, supertest_1.default)(app)
            .patch(`/api/bets/${betId}`)
            .send({ status: 'win' })
            .expect(200);
        expect(response.body.message).toBe('Bet Status Updated');
    });
    it('Should return invalid status', async () => {
        const response = await (0, supertest_1.default)(app)
            .patch(`/api/bets/${betId}`)
            .send({ status: 'InvalidStatus' })
            .expect(400);
        expect(response.body.message).toBe('Invalid bet status');
    });
    it('Should return invalid Id', async () => {
        await (0, supertest_1.default)(app)
            .patch(`/api/bets/${invalidBetId}`)
            .send({ status: 'win' })
            .expect(400);
    });
    afterAll(async () => {
        await mongoose_1.default.disconnect();
    });
});
