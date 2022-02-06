/* eslint-disable no-underscore-dangle */
import express, { Router } from 'express';
import responseBuilder from '../../utils/responseBuilder';
import User, { UserType } from '../../models/User';
import { searchUser } from '../../services/openSearchService';
import ERROR_CODES from '../../constant';
import userUtils from '../../utils/userUtils';
const router = Router();

/**
 * Get user by userId
 */
// TODO: Define type
router.get('/user/:userID', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const id = req.params.userID;

  if (!userUtils.validUserId(id)) {
    res.status(200).json(responseBuilder({ error: ERROR_CODES.User.InvalidFormat }));
  }

  try {
    const data = await User.findById(id).exec()
      res.status(200).json(responseBuilder({ data }));
  } catch (error) {
    console.log(error)
    res.status(200).json(responseBuilder({ error: ERROR_CODES.User.NotFound }));
  }
  
});

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', async(req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

  const id = req.params.startswith;

    try {
      const data = await searchUser(id)
      res.status(200).json(responseBuilder({ data: data.hits.map(userUtils.mapHit) }));
    } catch (error) {
      console.log(error)
      res.status(200).json(responseBuilder({ error: ERROR_CODES.User.UsernameError }));
    }

});

/**
 * Get all users
 */
router.get('/user', (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get all users'

  User.find({
    username: { $regex: `.*${req?.query?.username || ''}.*`, $options: 'i' },
    name: { $regex: `.*${req?.query?.name || ''}.*`, $options: 'i' },
    wallet: { $regex: `.*${req?.query?.wallet || ''}.*` },
  }).exec()
    .then((result: any) => {
      res.status(200).json(responseBuilder({ data: result }));
    }).catch(() => {
      res.status(200).json(responseBuilder({ error: ERROR_CODES.User.ErrorUserList }));
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
