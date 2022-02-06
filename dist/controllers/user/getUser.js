"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const express_1 = require("express");
const responseBuilder_1 = __importDefault(require("../../utils/responseBuilder"));
const User_1 = __importDefault(require("../../models/User"));
const openSearchService_1 = require("../../services/openSearchService");
const constant_1 = __importDefault(require("../../constant"));
const userUtils_1 = __importDefault(require("../../utils/userUtils"));
const router = (0, express_1.Router)();
/**
 * Get user by userId
 */
// TODO: Define type
router.get('/user/:userID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user by Used Id'
    const id = req.params.userID;
    if (!userUtils_1.default.validUserId(id)) {
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.InvalidFormat }));
    }
    try {
        const data = yield User_1.default.findById(id).exec();
        res.status(200).json((0, responseBuilder_1.default)({ data }));
    }
    catch (error) {
        console.log(error);
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.NotFound }));
    }
}));
/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user by the first characters of the username (case insensitive)'
    const id = req.params.startswith;
    try {
        const data = yield (0, openSearchService_1.searchUser)(id);
        res.status(200).json((0, responseBuilder_1.default)({ data: data.hits.map(userUtils_1.default.mapHit) }));
    }
    catch (error) {
        console.log(error);
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.UsernameError }));
    }
}));
/**
 * Get all users
 */
router.get('/user', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get all users'
    var _a, _b, _c;
    User_1.default.find({
        username: { $regex: `.*${((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.username) || ''}.*`, $options: 'i' },
        name: { $regex: `.*${((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.name) || ''}.*`, $options: 'i' },
        wallet: { $regex: `.*${((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.wallet) || ''}.*` },
    }).exec()
        .then((result) => {
        res.status(200).json((0, responseBuilder_1.default)({ data: result }));
    }).catch(() => {
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.ErrorUserList }));
    });
});
exports.default = router;
/*

GET _search
{
  "query": {
    "match": {
      "user": {
        "query": "jescuderow"
      }
    }
  }
}

{
    "query": {
        "prefix": {
              "username": "jescu"
        }
    }
}

*/
//# sourceMappingURL=getUser.js.map