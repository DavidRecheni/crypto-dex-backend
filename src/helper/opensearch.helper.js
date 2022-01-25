const { OpenSearchClient, AcceptInboundConnectionCommand } = require("@aws-sdk/client-opensearch");
const { HttpRequest} = require("@aws-sdk/protocol-http");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const { Sha256 } = require("@aws-crypto/sha256-browser");
var { Client } = require('@opensearch-project/opensearch');

//https://www.npmjs.com/package/@opensearch-project/opensearch

var OpenSearchHelper = {

    indexUser: function(userName, userId) {

        var host = 'search-cryptodex-elastic-ivg4rnchvfsezqrfsv6qt3mlva.eu-central-1.es.amazonaws.com';
        var protocol = 'https';
        var port = 443;
        var auth = 'goblinMaster:LernerPresidente2022!'; // For testing only. Don't store credentials in code.
        
        var index_name = 'username'
        var settings = {
            'settings': {
                'index': {
                    'number_of_shards': 4,
                    'number_of_replicas': 3
                }
            }
        }

        var client = new Client({
            node: protocol + '://' + auth + '@' + host + ':' + port,
        })

        var document = {
            'username': userName,
            'userId' : userId
        }
      
        var id = userId
      
        var response = client.index({
            id: id,
            index: index_name,
            body: document,
            refresh: true
        })
      
        console.log("Username has been indexed", userName, userId)
      },

    searchUser: async function(startsWith) {

        var host = 'search-cryptodex-elastic-ivg4rnchvfsezqrfsv6qt3mlva.eu-central-1.es.amazonaws.com';
        var protocol = 'https';
        var port = 443;
        var auth = 'goblinMaster:LernerPresidente2022!'; // For testing only. Don't store credentials in code.
        
        var index_name = 'username'

        var settings = {
            'settings': {
                'index': {
                    'number_of_shards': 4,
                    'number_of_replicas': 3
                }
            }
        }

        var client = new Client({
            node: protocol + '://' + auth + '@' + host + ':' + port,
        })

        var query = {
            'query': {
                'prefix': {
                    'username': startsWith
                }
            }
        }

        var response = await client.search({
            index: index_name,
            body: query
        })

        return response.body.hits
      }
}

module.exports = OpenSearchHelper