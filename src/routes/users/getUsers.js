const { Router } = require('express')
const router = Router()
const User = require('../../models/User')

router.get('/user', (req, res) => {
  console.log(req.query)
  User.find({
    username: { $regex: `.*${req?.query?.username || ''}.*`, $options: 'i' },
    name: { $regex: `.*${req?.query?.name || ''}.*`, $options: 'i' },
    wallet: { $regex: `.*${req?.query?.wallet || ''}.*` }
  })
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