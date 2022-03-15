// import { Client } from '@opensearch-project/opensearch';

// const indexName = 'username';

// const createOpenSearchClient = () => {
//   const host = process.env.OPENSEARCH_DOMAIN;
//   const protocol = process.env.OPENSEARCH_PROTOCOL;
//   const port = process.env.OPENSEARCH_PORT;
//   const auth = process.env.OPENSEARCH_AUTH;

//   const client = new Client({
//     node: `${protocol}://${auth}@${host}:${port}`,
//   });

//   return client;
// };

// export const indexUser = (userName: string, userId: string) => {
//   const client = createOpenSearchClient();

//   const document = {
//     username: userName.toLowerCase(),
//     userId,
//   };

//   const id = userId;

//   const response = client.index({
//     id,
//     index: indexName,
//     body: document,
//     refresh: true,
//   });

//   console.log('Username has been indexed', userName, userId, response);
// };

// export const searchUser = async (startsWith: string) => {
//   const client = createOpenSearchClient();

// #FOR LATER USE (REGEX)
// var query = {
//     'query': {
//         'regexp': {
//             'username': startsWith
//         }
//     }
// }

//   const query = {
//     query: {
//       prefix: {
//         username: startsWith.toLowerCase(),
//       },
//     },
//   };

//   const response = await client.search({
//     index: indexName,
//     body: query,
//   });

//   return response.body.hits;
// };
