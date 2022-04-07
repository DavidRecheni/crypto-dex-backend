import express, { Router } from 'express';
import responseBuilder from '../utils/responseBuilder';
import userUtils from '../utils/userUtils';
import User from '../models/User';
import ERROR_CODES from '../constant';
import Wallet from '../models/Wallet';
import checkAuth from '../utils/checkAuth';
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
      const data = await User.findById(id, userUtils.publicFields).exec();
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
router.get('/user/wallet/:publicAddress', async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by wallet address'

  const address = req.params.publicAddress;
  let result = {};

  if (!address) {
    result = responseBuilder({ error: 'Wallet ID information is missing on the request params' });
    return res.status(400).json(result);
  }

  try {
    const userWithAddress = await User.findOne({ publicAddress: address }, userUtils.publicFields);
    if (userWithAddress) result = responseBuilder({ data: userWithAddress });
    else {
      const walletInfo = await Wallet.findOne({ address }).exec();
      const data = await User.findById(walletInfo.userId, userUtils.publicFields).exec();
      result = responseBuilder({ data });
    }
  } catch (error) {
    console.log(error);
    result = responseBuilder({ error: ERROR_CODES.Wallet.NotFound });
  }

  return res.status(200).json(result);
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
    }, userUtils.publicFields).exec();
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
    }, userUtils.publicFields).exec();
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
    const user = await User.find({}, userUtils.publicFields).exec();
    result = responseBuilder({ data: user });
  } catch (error) {
    result = responseBuilder({ error: ERROR_CODES.User.ErrorUserList });
  }

  res.status(200).json(result);
});

type userModificationRequest = {
  headers: {
    authorization: string
  },
  body: {
    userId: string
  },
  userId: string
}

router.put('/user/:userId', checkAuth, async (req: express.Request<userModificationRequest>, res) => {
  let data = {};
  try {
    const reqUserId = req.body.userId;
    const newValues = req.body;
    const { userId } = req.params;
    if (!(reqUserId === userId)) {
      data = responseBuilder({ error: ERROR_CODES.Auth.unauthorized });
    } else {
      data = await User.findByIdAndUpdate(userId, newValues);
    }
  } catch (e) {
    data = responseBuilder({ error: e });
  }

  res.status(200).json(data);
});

/**
 * Create a new user and indexes for quicker search
 */
router.post('/user', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Create a new user'

  const user = new User(req.body);
  console.log(user);
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
