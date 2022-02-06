"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = require("express");
const responseBuilder_1 = __importDefault(require("../../utils/responseBuilder"));
const constant_1 = __importDefault(require("../../constant"));
const User_1 = __importDefault(require("../../models/User"));
const openSearchService_1 = require("../../services/openSearchService");
const router = (0, express_1.Router)();
/**
 * Create a new user and indexes for quicker search
 */
router.post('/user', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Create a new user'
    var _a, _b, _c, _d, _e;
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name,
        username: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.username,
        wallet: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.wallet,
        bio: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.bio,
        avatar: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.avatar,
    });
    user.save().then((newUser) => {
        (0, openSearchService_1.indexUser)(newUser.username, newUser._id.toString());
        res.status(200).json((0, responseBuilder_1.default)({ data: newUser }));
    }).catch(() => {
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.UnableToCreate }));
    });
});
exports.default = router;
//# sourceMappingURL=postUser.js.map