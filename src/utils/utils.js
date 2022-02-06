createResponse = function (data, error) {

    return { error: error, data: data};
}

//Transform OpenSearch hit into known object
function mapHit(hit) {
    return {
      'username': hit._source.username,
      'userId': hit._source.userId
    };
  }
  
  //Validate UserId format
  function validUserId(userId) {
    
    //TODO: change to regex
    if(userId.length > 25)
      return false;
  
    return true;
  }

module.exports = { createResponse, mapHit, validUserId }