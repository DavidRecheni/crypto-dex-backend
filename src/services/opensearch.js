const { Client } = require('@opensearch-project/opensearch');

const index_name = 'username'
const searchRegex = ''

const createOpenSearchClient = function() {

    var host = process.env.OPENSEARCH_DOMAIN;
    var protocol = process.env.OPENSEARCH_PROTOCOL;
    var port = process.env.OPENSEARCH_PORT;
    var auth = process.env.OPENSEARCH_AUTH;

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

    return client;
}

const indexUser = function(userName, userId) {

    var client = createOpenSearchClient();

    var document = {
        'username': userName.toLowerCase(),
        'userId' : userId
    }
    
    var id = userId

    var response = client.index({
        id: id,
        index: index_name,
        body: document,
        refresh: true
    })
    
    console.log("Username has been indexed", userName, userId, response)
}

const searchUser = async function(startsWith) {

    var client = createOpenSearchClient();

    //#FOR LATER USE (REGEX)
    // var query = {
    //     'query': {
    //         'regexp': {
    //             'username': startsWith
    //         }
    //     }
    // }

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

module.exports = { indexUser, searchUser }