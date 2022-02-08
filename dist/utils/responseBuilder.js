"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseBuilder = (data = [], error = '') => ({
    status: error ? 'OK' : 'ERROR',
    error,
    data,
});
exports.default = responseBuilder;
//# sourceMappingURL=responseBuilder.js.map