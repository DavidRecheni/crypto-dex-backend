const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const cors = require('cors')
const OpenSearchHelper = require('../../helper/opensearch.helper')

// router.use(cors())

router.get('/user/:userID', (req, res) => {
  console.log('Fetch user', req.params)
  const id = req.params.userID

  User.findById(id).exec()
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

  const id = req.params.startswith

  var response = OpenSearchHelper.searchUser(id)
  .then((hits) => {
    res.status(200).json(hits.hits.map(mapHit));
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: err })
  })
})

router.get('/wallet/:address', (req, res) => {

  const address = req.params.address

  User.findOne({ wallet: address }).exec()
  .then(r => {
    res.status(200).json(r)
  })
  .catch(err => {
    res.status(500).json({ error: err })
  })
})

function mapHit(hit) {
  return {
    'username' : hit._source.username,
    'userId' : hit._source.userId
  };
}

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