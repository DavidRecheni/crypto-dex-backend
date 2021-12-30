const mongoose = require('mongoose')
const { Router } = require('express')
const router = Router()
const User = require('../../models/User')

router.post('/users', (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req?.body?.name,
    username: req?.body?.username,
    wallets: req?.body?.wallets,
    description: req?.body?.description
  })

  user.save().then((result) => {
    console.log("201", result)
  }).catch((err) => {
    console.log("400", err)
  });

  res.status(201).json({
    message: "Handling POST request to /users",
    createdUser: user
  })
})

module.exports = router;