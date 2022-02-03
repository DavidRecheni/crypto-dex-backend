const { Router } = require('express')
const router = Router()
const coins = require('../../services/catalog')

/**
 * Get catalog by parameter
 */
router.get('/catalog/:parameter', (req, res) => {
  // #swagger.tags = ['Catalog']
  // #swagger.description = 'Get catalog lists based on parameter. Possible values: coin, , ,'

  const id = req.params.parameter

  switch(req.params.parameter)
  {
    case 'coin':
      res.status(200).json(coins.coinsList());
  }
})

module.exports = router;