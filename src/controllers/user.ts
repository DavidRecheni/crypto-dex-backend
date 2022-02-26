import express, { Router } from 'express';
import responseBuilder from '../utils/responseBuilder';
import userUtils from '../utils/userUtils';
import User from '../models/User';
import ERROR_CODES from '../constant';
import { indexUser, searchUser } from '../services/openSearchService';
import { base64encode, base64decode } from 'nodejs-base64'

const router = Router();

/**
 * Get user by userId
 */
// TODO: Define type
router.get('/user/:userID', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const id = req.params.userID;
  let result = {};

  if (!userUtils.validUserId(id)) {
    result = responseBuilder({ error: ERROR_CODES.User.InvalidFormat });
  } else {
    try {
      const data = await User.findById(id).exec();
      result = responseBuilder(data);
    } catch (error) {
      result = responseBuilder({ error: ERROR_CODES.User.NotFound });
    }
  }

  res.status(200).json(result);
});

/**
 * Get user by wallet address
 */
router.get('/user', async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by wallet address'

  const { address } = req.query;
  let result = {};

  try {
    const data = await User.findOne({ wallet: address }).exec();
    result = responseBuilder(data);
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  res.status(200).json(result);
});

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

  const id = req.params.startswith;
  let result = {};

  try {
    const data = await searchUser(id);
    result = responseBuilder(data.hits.map(userUtils.mapHit));
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.User.UsernameError });
  }

  res.status(200).json(result);
});

/**
 * Get all users
 */
router.get('/user', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'

  let result = {};

  try {
    const user = await User.find(userUtils.mapUserFind(req)).exec();
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
    indexUser(data.username, data._id.toString());
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

/**
 * Create a new user and indexes for quicker search
 */
 router.post('/signature', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Create a new user'

  // TODO: Move nonce generator to default on schema
  const signature = req.body.signature;
  let result = {};

  try {

    let data = [];

    if(userUtils.validateSignature(signature))
    {
      data = [{ valid: "true", token: base64encode(signature) }];
      res.cookie('chaintree_auth', base64encode(signature), { maxAge: 900000, httpOnly: false }) //change to httpOnly true when ssl
    }
    else
      data = [{ valid: "false" }];
      
    result = responseBuilder({data : data});
  } catch (error) {
    result = responseBuilder({ error: ERROR_CODES.User.SignatureInvalid });
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
