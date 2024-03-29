import express, { Router } from 'express';
import { ethers } from 'ethers';
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
    result = responseBuilder({ data: { nonce: userUtils.noncePhrase(data.nonce) } });
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

  const userData = await User
    .findOne({ publicAddress });

  const verifiedAddress = ethers
    .utils
    .verifyMessage(userUtils.noncePhrase(userData.nonce), signedMessage);
  console.log('verification: ', verifiedAddress);

  if (verifiedAddress === publicAddress) {
    userData.nonce = Math.floor(Math.random() * 1000000);
    userData.save();
    const accessToken = generateAccessToken({ publicAddress, userId: userData.id });

    res.cookie('chaintree_jwt', accessToken, { maxAge: 18000, httpOnly: false }); // change to httpOnly true when ssl
    return res
      .status(200)
      .json({
        user: userData,
        token: accessToken,
      });
  }

  return res.status(200).json(responseBuilder({ error: ERROR_CODES.User.InvalidSignature }));
});

export default router;
