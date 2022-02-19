import express, { Router } from 'express';
import mongoose from 'mongoose';
import Wallet from '../models/Wallet';
import ERROR_CODES from '../constant';
import responseBuilder from '../utils/responseBuilder';

const router = Router();

/**
 * Get wallet by wallet address and user id
 */
router.get('/address/:userId/:coin/:priority?', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['Address']
  // #swagger.description = 'Get address from userId, coin and priority'

  const { userId } = req.params;
  const { coin } = req.params;
  const priority = req.params.coin;
  let result = {};

  try {
    let data = {};
    data = await Wallet.find({ userId, coin, main: !!priority }).exec();

    result = responseBuilder(data);
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  res.status(200).json(result);
});

/**
 * Create a new wallet for a specific user
 */
router.post('/wallet', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['Wallet']
  // #swagger.description = 'Create a new wallet address'

  const wallet = new Wallet({
    _id: new mongoose.Types.ObjectId(),
    coin: req?.body?.coin,
    userId: req?.body?.userId,
    address: req?.body?.address,
    main: req?.body?.main,
  });
  let result = {};

  try {
    const data = await wallet.save();
    result = responseBuilder(data);
  } catch (error) {
    result = responseBuilder({ error: ERROR_CODES.Wallet.UnableToCreate });
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
