const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const cors = require('cors')

router.use(cors())

router.get('/user/:userID', (req, res) => {
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

router.get('/username/:startswith', (req, res) => {
  console.log(req.params)
  const id = req.params.startswith

  var response = {
    "data": [
      {
        "username": id + ".crypto",
        "id": "61d75779b64ac237592166fa"
      },
      {
        "username": id + ".miwallet",
        "id": "61d757ffefe2fb687cd8f47b"
      },
      {
        "username": id + "-maradona",
        "id": "61d75b9e161885ebeeb55a7d"
      },
      {
        "username": id + ".bille",
        "id": "61d75ca62d5881fae9237baa"
      },
      {
        "username": id + "lalala",
        "id": "61d761c6666b267d99b7fd75"
      },
      {
        "username": id + "thewall",
        "id": "61d76958c1978f838d1645f1"
      }
    ]
  }

  res.status(200).json(response)

  // User.findById(id)
  //   .exec()
  //   .then(r => {
  //     console.log(r)
  //     res.status(200).json(r)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(500).json({ error: err })
  //   })
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


*/

  // User.findById(id)
  //   .exec()
  //   .then(r => {
  //     console.log(r)
  //     res.status(200).json(r)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(500).json({ error: err })
  //   })