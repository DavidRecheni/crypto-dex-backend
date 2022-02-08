import { Router } from 'express';
import User from '../../models/User';

const router = Router();

/**
 * Get user by wallet address
 */
router.get('/wallet/:address', (req, res) => {
  // #swagger.tags = ['Wallet']
  // #swagger.description = 'Get user by wallet address'

  const { address } = req.params;

  User.findOne({ wallet: address }).exec()
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

export default router;

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
