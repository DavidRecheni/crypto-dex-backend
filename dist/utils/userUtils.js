"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userUtils = {
    validUserId: (userId) => userId.length > 25,
    mapHit: (hit) => ({
        username: hit._source.username,
        userId: hit._source.userId,
    }),
};
exports.default = userUtils;
//# sourceMappingURL=userUtils.js.map