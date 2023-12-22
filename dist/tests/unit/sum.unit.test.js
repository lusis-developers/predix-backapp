"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExampleFunction_1 = require("../../scripts/ExampleFunction");
describe('Sum Function Example Test', () => {
    it('correctly adds two numbers', () => {
        expect((0, ExampleFunction_1.sum)(1, 2)).toBe(3);
    });
});
