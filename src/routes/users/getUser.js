const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const OpenSearchService = require('../../services/opensearch')

/**
 * Get user by userId
 */
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

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', (req, res) => {

  const id = req.params.startswith

  OpenSearchService.searchUser(id)
    .then((hits) => {
      res.status(200).json(hits.hits.map(mapHit));
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

/**
 * Get user by wallet address
 */
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
    'username': hit._source.username,
    'userId': hit._source.userId
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