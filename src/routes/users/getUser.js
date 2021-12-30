const { Router } = require('express')
const router = Router()
const User = require('../../models/User')

router.get('/users/:userID', (req, res) => {
  console.log(req.params)
  const id = req.params.userID
  User.findById(id)
    .exec()
    .then(r => {
      console.log(r)
      res.status(200).json(r)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

module.exports = router;