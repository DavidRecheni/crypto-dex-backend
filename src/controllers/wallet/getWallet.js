const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const OpenSearchService = require('../../services/opensearch')

/**
 * Get user by wallet address
 */
router.get('/wallet/:address', (req, res) => {
  // #swagger.tags = ['Wallet']
  // #swagger.description = 'Get user by wallet address'

  const address = req.params.address

  User.findOne({ wallet: address }).exec()
    .then(r => {
      res.status(200).json(r)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
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

{
    "query": {
        "prefix": {
              "username": "jescu"
        }
    }
}

*/