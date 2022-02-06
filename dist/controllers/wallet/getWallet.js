"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
/**
 * Get user by wallet address
 */
router.get('/wallet/:address', (req, res) => {
    // #swagger.tags = ['Wallet']
    // #swagger.description = 'Get user by wallet address'
    const { address } = req.params;
    User_1.default.findOne({ wallet: address }).exec()
        .then((r) => {
        res.status(200).json(r);
    })
        .catch((err) => {
        res.status(500).json({ error: err });
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
//# sourceMappingURL=getWallet.js.map