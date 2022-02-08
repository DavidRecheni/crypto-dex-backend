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
    var _a, _b, _c, _d, _e, _f;
    // #swagger.tags = ['User']
    // #swagger.description = 'Create a new user'
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
        username: (_b = req.body) === null || _b === void 0 ? void 0 : _b.username,
        publicAddress: (_c = req.body) === null || _c === void 0 ? void 0 : _c.publicAddress,
        email: (_d = req.body) === null || _d === void 0 ? void 0 : _d.email,
        bio: (_e = req.body) === null || _e === void 0 ? void 0 : _e.bio,
        avatar: (_f = req.body) === null || _f === void 0 ? void 0 : _f.avatar,
    });
    user.save().then((newUser) => {
        (0, openSearchService_1.indexUser)(newUser.username, newUser._id.toString());
        // TODO: Reeplace with token
        res.status(200).json((0, responseBuilder_1.default)({ data: Object.assign(Object.assign({}, newUser), { token: 'asdasd123123' }) }));
    }).catch((e) => {
        console.log('error creating user', e);
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.UnableToCreate }));
    });
});
exports.default = router;
//# sourceMappingURL=postUser.js.map