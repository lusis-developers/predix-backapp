"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = void 0;
const ENGINE_DB = process.env.ENGINE_DB;
function getProperties() {
    const data = {
        nosql: {
            id: '_id'
        }
    };
    return data[ENGINE_DB];
}
exports.getProperties = getProperties;
exports.default = getProperties;
