"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.end('Welcome to Chaintree API. Use /swagger for available endpoints.');
});
exports.default = router;
//# sourceMappingURL=index.js.map