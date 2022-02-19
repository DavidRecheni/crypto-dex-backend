import express, { Router } from 'express';
import ERROR_CODES from '../constant';
import responseBuilder from '../utils/responseBuilder';
import User from '../models/User';

const router = Router();

/**
 * Get nonce from public wallet address
 */
router.get('/auth/:publicAddress', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = '* Get nonce from public wallet address'

  console.log(req.params.publicAddress);

  const { publicAddress } = req.params;
  let result = {};

  try {
    const data = await User
      .findOne({ publicAddress })
      .select({ _id: 0, nonce: 1, publicAddress: 1 })
      .exec();
    console.log('found user: ', data);
    result = responseBuilder(data);
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  res.status(200).json(result);
});

export default router;
