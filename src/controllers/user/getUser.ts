/* eslint-disable no-underscore-dangle */
import express, { Router } from 'express';
import responseBuilder from '../../utils/responseBuilder';
import User, { UserType } from '../../models/User';
import { searchUser } from '../../services/openSearchService';
import ERROR_CODES from '../../constant';

const router = Router();

/**
 * Get user by userId
 */

const validUserId = (userId: string) => !(userId.length > 25);

// TODO: Define type
function mapHit(hit: any) {
  return {
    username: hit._source.username,
    userId: hit._source.userId,
  };
}

router.get('/user/:userID', (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const id = req.params.userID;

  if (!validUserId(id)) {
    res.status(200).json(responseBuilder({ error: ERROR_CODES.User.InvalidFormat }));
  }

  User.findById(id).exec()
    .then((userFound: UserType) => {
      res.status(200).json(responseBuilder({ data: userFound }));
    })
    .catch(() => {
      res.status(200).json(responseBuilder({ error: ERROR_CODES.User.NotFound }));
    });
});

/**
 * Get username by the first characters sent (min 3)
 */
router.get('/username/:startswith', (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by the first characters of the username (case insensitive)'

  const id = req.params.startswith;

  searchUser(id)
    .then((hits) => {
      res.status(200).json(responseBuilder({ data: hits.hits.map(mapHit) }));
    })
    .catch(() => {
      res.status(200).json(responseBuilder({ error: ERROR_CODES.User.UsernameError }));
    });
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
