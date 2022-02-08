"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    name: String,
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    bio: String,
    avatar: { type: {
            head: Number,
            torso: Number,
            body: Number
        }, required: true },
    publicAddress: { type: String, unique: true, required: true },
    nonce: { type: Number, defaut: () => Math.floor(Math.random() * 1000000) }
});
const user = mongoose_1.default.model('User', UserSchema);
exports.default = user;
//# sourceMappingURL=User.js.map