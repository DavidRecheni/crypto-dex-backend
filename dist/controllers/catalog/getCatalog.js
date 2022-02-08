"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalog_1 = __importDefault(require("../../services/catalog"));
const router = (0, express_1.Router)();
/**
 * Get catalog by parameter
 */
router.get('/catalog/:parameter', (req, res) => {
    // #swagger.tags = ['Catalog']
    // #swagger.description = 'Get catalog lists based on parameter. Possible values: coin, , ,'
    switch (req.params.parameter) {
        case 'coin':
            res.status(200).json((0, catalog_1.default)());
            break;
        default:
            res.status(200).json({ error: 'Catalog not found' });
    }
});
exports.default = router;
//# sourceMappingURL=getCatalog.js.map