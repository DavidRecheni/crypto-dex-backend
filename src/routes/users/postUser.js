const mongoose = require('mongoose')
const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const OpenSearchHelper = require('../../helper/opensearch.helper')
const cors = require('cors')

router.use(cors())

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

    OpenSearchHelper.indexUser(user.username, user._id.toString())
    console.log("201", user.username)
  }).catch((err) => {

    console.log("400", err)
  });

  res.status(201).json({
    message: "Handling POST request to /users",
    createdUser: user
  })

})

module.exports = router;