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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.indexUser = void 0;
const opensearch_1 = require("@opensearch-project/opensearch");
const indexName = 'username';
const createOpenSearchClient = () => {
    const host = process.env.OPENSEARCH_DOMAIN;
    const protocol = process.env.OPENSEARCH_PROTOCOL;
    const port = process.env.OPENSEARCH_PORT;
    const auth = process.env.OPENSEARCH_AUTH;
    const client = new opensearch_1.Client({
        node: `${protocol}://${auth}@${host}:${port}`,
    });
    return client;
};
const indexUser = (userName, userId) => {
    const client = createOpenSearchClient();
    const document = {
        username: userName.toLowerCase(),
        userId,
    };
    const id = userId;
    const response = client.index({
        id,
        index: indexName,
        body: document,
        refresh: true,
    });
    console.log('Username has been indexed', userName, userId, response);
};
exports.indexUser = indexUser;
const searchUser = (startsWith) => __awaiter(void 0, void 0, void 0, function* () {
    const client = createOpenSearchClient();
    // #FOR LATER USE (REGEX)
    // var query = {
    //     'query': {
    //         'regexp': {
    //             'username': startsWith
    //         }
    //     }
    // }
    const query = {
        query: {
            prefix: {
                username: startsWith.toLowerCase(),
            },
        },
    };
    const response = yield client.search({
        index: indexName,
        body: query,
    });
    return response.body.hits;
});
exports.searchUser = searchUser;
//# sourceMappingURL=openSearchService.js.map