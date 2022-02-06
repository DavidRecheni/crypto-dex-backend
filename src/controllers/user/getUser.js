const { Router } = require('express')
const router = Router()
const CONSTANT = require('../../constant')
const utils = require('../../utils/utils')
const User = require('../../models/User')
const openSearchService = require('../../services/opensearch')

/**
 * Get user by userId
 */
router.get('/user/:userID', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const id = req.params.userID

  if(!utils.validUserId(id))
  {
    const resp = utils.createResponse({}, CONSTANT.ERRORCODE.USER.INVALIDFORMAT)
    res.status(200).json(resp)
  }

  User.findById(id).exec()
    .then(userFound => {
      
      if(!userFound)
        return utils.createResponse({}, CONSTANT.ERRORCODE.USER.NOTFOUND)
      
      return utils.createResponse(userFound)
    })
    .catch(err => {

      return utils.createResponse({}, CONSTANT.ERRORCODE.USER.NOTFOUND)
    }).then(result => 

      //TODO: to check whether the response HTTP code must be Restful strict   
      res.status(200).json(result)
    );
})

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

  const id = req.params.startswith

  openSearchService.searchUser(id)
    .then((hits) => {

      return utils.createResponse(hits.hits.map(utils.mapHit))
    })
    .catch(err => {
      
      return utils.createResponse({},CONSTANT.ERRORCODE.USER.USERNAMEERROR)
    })
    .then(result => 

      //TODO: to check whether the response HTTP code must be Restful strict   
      res.status(200).json(result)
    );
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

    return utils.createResponse(result)
  })
  .catch((err) => {
    
    return utils.createResponse({}, CONSTANT.ERRORCODE.USER.ERRORUSERLIST)
  })
  .then(result => 

    //TODO: to check whether the response HTTP code must be Restful strict   
    res.status(200).json(result)
  );
})

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