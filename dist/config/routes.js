"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../controllers/index"));
const getUser_1 = __importDefault(require("../controllers/user/getUser"));
const postUser_1 = __importDefault(require("../controllers/user/postUser"));
const getWallet_1 = __importDefault(require("../controllers/wallet/getWallet"));
const getCatalog_1 = __importDefault(require("../controllers/catalog/getCatalog"));
const cors_1 = __importDefault(require("cors"));
exports.default = (app) => {
    app.use((0, cors_1.default)());
    app.use(index_1.default);
    app.use(getUser_1.default);
    app.use(postUser_1.default);
    app.use(getWallet_1.default);
    app.use(getCatalog_1.default);
};
//# sourceMappingURL=routes.js.map