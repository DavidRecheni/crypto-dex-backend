const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const OpenSearchService = require('../../services/opensearch')

/**
 * Get user by userId
 */
router.get('/user/:userID', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

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
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

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
 * Get all users
 */
router.get('/user', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'

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