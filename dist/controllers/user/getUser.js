"use strict";
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
const router = (0, express_1.Router)();
/**
 * Get user by userId
 */
const validUserId = (userId) => !(userId.length > 25);
// TODO: Define type
function mapHit(hit) {
    return {
        username: hit._source.username,
        userId: hit._source.userId,
    };
}
router.get('/user/:userID', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user by Used Id'
    const id = req.params.userID;
    if (!validUserId(id)) {
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.InvalidFormat }));
    }
    User_1.default.findById(id).exec()
        .then((userFound) => {
        res.status(200).json((0, responseBuilder_1.default)({ data: userFound }));
    })
        .catch(() => {
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.NotFound }));
    });
});
/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Get user by the first characters of the username (case insensitive)'
    const id = req.params.startswith;
    (0, openSearchService_1.searchUser)(id)
        .then((hits) => {
        res.status(200).json((0, responseBuilder_1.default)({ data: hits.hits.map(mapHit) }));
    })
        .catch(() => {
        res.status(200).json((0, responseBuilder_1.default)({ error: constant_1.default.User.UsernameError }));
    });
});
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