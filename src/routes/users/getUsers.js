const { Router } = require('express')
const router = Router()
const User = require('../../models/User')

router.get('/users', (req, res) => {
  User.find({})
    .exec()
    .then((result) => {
      console.log(result)
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    });
})

module.exports = router;