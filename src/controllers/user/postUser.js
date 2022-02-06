const mongoose = require('mongoose')
const { Router } = require('express')
const router = Router()
const CONSTANT = require('../../constant')
const utils = require('../../utils/utils')
const User = require('../../models/User')
const openSearchService = require('../../services/opensearch')

/**
 * Create a new user and indexes for quicker search
 */
router.post('/user', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Create a new user'

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req?.body?.name,
    username: req?.body?.username,
    wallet: req?.body?.wallet,
    bio: req?.body?.bio,
    avatar: req?.body?.avatar
  })

  user.save()
    .then(user => {

      openSearchService.indexUser(user.username, user._id.toString())
      return utils.createResponse(user)
    })
    .catch((err) => {

      return utils.createResponse({}, CONSTANT.ERRORCODE.USER.UNABLETOCREATE)
    })
    .then(result => 

      //TODO: to check whether the response HTTP code must be Restful strict   
      res.status(200).json(result)
    );
})

module.exports = router;