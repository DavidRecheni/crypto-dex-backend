"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    name: String,
    username: String,
    wallet: String,
    bio: String,
    avatar: String,
});
mongoose_1.default.connect(process.env.DATABASE_URL);
const user = mongoose_1.default.model('User', UserSchema);
exports.default = user;
//# sourceMappingURL=User.js.map