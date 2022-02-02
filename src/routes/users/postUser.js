const mongoose = require('mongoose')
const { Router } = require('express')
const router = Router()
const User = require('../../models/user')
const OpenSearchService = require('../../services/opensearch')

/**
 * Create a new user and indexes for quicker search
 */
router.post('/user', (req, res) => {

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
  }).catch((err) => {

    console.log("400", err)
  });

  res.status(201).json({
    message: "User created",
    createdUser: user
  })

})

module.exports = router;