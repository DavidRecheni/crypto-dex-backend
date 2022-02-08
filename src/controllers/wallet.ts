import { Router } from 'express';
import User from '../models/User';
import ERROR_CODES from '../constant';
import responseBuilder from '../utils/responseBuilder';

const router = Router();

/**
 * Get user by wallet address
 */
router.get('/wallet/:address', async (req, res) => {
  // #swagger.tags = ['Wallet']
  // #swagger.description = 'Get user by wallet address'

  const { address } = req.params;
  let result = {};

  try {
    const data = await User.findOne({ wallet: address }).exec();
    result = responseBuilder(data);
  } catch (error) {
    console.log(error)
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  res.status(200).json(result);

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
