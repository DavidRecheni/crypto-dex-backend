const { Router } = require('express')
const router = Router()
const User = require('../../models/User')
const cors = require('cors')
const OpenSearchHelper = require('../../helper/OpenSearch.Helper')

router.use(cors())

router.get('/user/:userID', (req, res) => {
  console.log('Fetch user', req.params)
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

  console.log("Looking for username: " )

  var response = OpenSearchHelper.searchUser(id).then((hits) => {
    console.log("OpenSearch result count" + hits.total.value)

    res.status(200).json(hits)
  });
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