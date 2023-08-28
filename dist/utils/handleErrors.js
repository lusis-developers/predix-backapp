"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleHttpError(res, message = 'Oops, somethins happened', code = 403) {
    res.status(code);
    res.send({ error: message });
}
exports.default = handleHttpError;
