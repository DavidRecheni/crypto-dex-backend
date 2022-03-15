import express, { Router } from 'express';
import responseBuilder from '../utils/responseBuilder';
import userUtils from '../utils/userUtils';
import User from '../models/User';
import ERROR_CODES from '../constant';
import Wallet from '../models/Wallet';
// import { indexUser, searchUser } from '../services/openSearchService';

const router = Router();

/**
 * Get user by userId
 */
// TODO: Define type
router.get('/user/id/:userID', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const id = req.params.userID;
  let result = {};

  if (!userUtils.validUserId(id)) {
    result = responseBuilder({ error: ERROR_CODES.User.InvalidFormat });
  } else {
    try {
      const data = await User.findById(id).exec();
      result = responseBuilder({ data });
    } catch (error) {
      result = responseBuilder({ error: ERROR_CODES.User.NotFound });
    }
  }
  res.status(200).json(result);
});

/**
 * Get user by wallet address
 */
router.get('/user/wallet', async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by wallet address'

  const address = req.body.wallet_address as string;
  let result = {};

  try {
    const walletInfo = await Wallet.findOne({ address }).exec();
    const data = await User.findById(walletInfo.userId).exec();
    result = responseBuilder({ data });
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  res.status(200).json(result);
});

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/users/username/:startswith', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

  const id = req.params.startswith;
  let result = {};

  try {
    // const data = await searchUser(id);
    const data = await User.find({
      username: { $regex: `.*${id || ''}.*`, $options: 'i' },
    }).exec();
    result = responseBuilder({ data });
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.User.UsernameError });
  }

  res.status(200).json(result);
});

/**
 * Get user by username strict
 */
router.get('/user/username/:username', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the username caseinsensitive'

  const id = req.params.username;
  let result = {};

  try {
    const data = await User.findOne({
      username: id,
    }).exec();
    result = responseBuilder({ data });
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.User.UsernameError });
  }

  res.status(200).json(result);
});

/**
 * Get all users
 */
router.get('/users', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'

  let result = {};

  try {
    const user = await User.find().exec();
    result = responseBuilder({ data: user });
  } catch (error) {
    result = responseBuilder({ error: ERROR_CODES.User.ErrorUserList });
  }

  res.status(200).json(result);
});

/**
 * Create a new user and indexes for quicker search
 */
router.post('/user', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Create a new user'

  // TODO: Move nonce generator to default on schema
  const user = new User({ ...req.body, nonce: Math.floor(Math.random() * 1000000) });
  let result = {};

  try {
    const data = await user.save();
    // indexUser(data.username, data._id.toString());
    result = responseBuilder(data);
  } catch (error) {
    console.log(error);
    switch (error?.code) {
      case 11000:
        result = responseBuilder({ error: ERROR_CODES.User.AlreadyExists });
        break;
      default:
        result = responseBuilder({ error: ERROR_CODES.User.UnableToCreate });
    }
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
