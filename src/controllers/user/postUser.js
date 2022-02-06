const mongoose = require('mongoose')
const { Router } = require('express')
const router = Router()
const Constant = require('../../constant')
const User = require('../../models/User')
const OpenSearchService = require('../../services/opensearch')

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

  user.save().then(user => {

    OpenSearchService.indexUser(user.username, user._id.toString())

    let resp = {
      status : 'Ok',
      error : '',
      data : user
    }

    res.status(200).json(resp)

  }).catch((err) => {

    let resp = {
      status : 'Error',
      error : Constant.ErrorCode.User.UnableToCreate,
      data : {}
    }

    res.status(200).json(resp)

  });
})

module.exports = router;