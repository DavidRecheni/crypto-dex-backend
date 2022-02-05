const { Router } = require('express')
const router = Router()
const Constant = require('../../constant')
const User = require('../../models/User')
const response = require('../../models/response')
const OpenSearchService = require('../../services/opensearch')
const constants = require('../../constant')

/**
 * Get user by userId
 */
router.get('/user/:userID', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const id = req.params.userID

  if(!validUserId(id))
  {
    let resp = {
      status : 'Error',
      error : Constant.ErrorCode.User.InvalidFormat,
      data : {}
    }
    res.status(200).json(resp)
  }

  User.findById(id).exec()
    .then(userFound => {

      let resp = {
        status : 'Ok',
        error : '',
        data : userFound
      }
      
      res.status(200).json(resp)
    })
    .catch(err => {

      let resp = {
        status : 'Error',
        error : Constant.ErrorCode.User.NotFound,
        data : {}
      }

      res.status(200).json(resp)
    })
})

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

  const id = req.params.startswith

  OpenSearchService.searchUser(id)
    .then((hits) => {

      let resp = {
        status : 'Ok',
        error : '',
        data : hits.hits.map(mapHit)
      }

      res.status(200).json(resp)
    })
    .catch(err => {
      
      let resp = {
        status : 'Error',
        error : Constant.ErrorCode.User.UsernameError,
        data : {}
      }

      res.status(200).json(resp)
    })
})

/**
 * Get all users
 */
router.get('/user', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'

  User.find({
    username: { $regex: `.*${req?.query?.username || ''}.*`, $options: 'i' },
    name: { $regex: `.*${req?.query?.name || ''}.*`, $options: 'i' },
    wallet: { $regex: `.*${req?.query?.wallet || ''}.*` }
  }).exec()
  .then((result) => {

    let resp = {
      status : 'Ok',
      error : '',
      data : result
    }

    res.status(200).json(resp)
  }).catch((err) => {
    
    let resp = {
      status : 'Error',
      error : Constant.ErrorCode.User.ErrorUserList,
      data : {}
    }

    res.status(200).json(resp)
  });
})

function mapHit(hit) {
  return {
    'username': hit._source.username,
    'userId': hit._source.userId
  };
}

function validUserId(userId) {
  
  //TODO: change to regex
  if(userId.length > 25)
    return false;

  return true;
}

module.exports = router;

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