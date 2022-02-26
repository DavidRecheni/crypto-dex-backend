import express, { Router } from 'express';
import generateAccessToken from '../utils/token';
import ERROR_CODES from '../constant';
import responseBuilder from '../utils/responseBuilder';
import User from '../models/User';
import userUtils from '../utils/userUtils';

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
    result = responseBuilder({ data: { ...data, nonce: userUtils.noncePhrase(data.nonce) } });
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  res.status(200).json(result);
});

/**
 * Post signedMessage to validate signature
 */
router.post('/auth', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = '* Post signedMessage to validate signature'

  console.log('POST body', req.body);

  const { signedMessage, publicAddress } = req.body;

  if (!signedMessage || !publicAddress) {
    return res
      .status(200)
      .json(responseBuilder({ error: ERROR_CODES.Wallet.NotFound }));
  }

  // TODO: Fetch nonce, validate signature, generate token

  return res.status(200).json({ token: generateAccessToken({ publicAddress, nonce: 100 }) });
});

export default router;
