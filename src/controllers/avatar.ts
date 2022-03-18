import express, { Router } from 'express';
// import { indexUser, searchUser } from '../services/openSearchService';

const router = Router();

/**
 * Get user by userId
 */
// TODO: Define type
router.post('/avatar', async (req:express.Request, res:express.Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Get user by Used Id'

  const avatarArr = req.body;

  console.log('avatar', avatarArr);
  // if (!userUtils.validUserId(id)) {
  //   result = responseBuilder({ error: ERROR_CODES.User.InvalidFormat });
  // } else {
  //   try {
  //     const data = await User.findById(id).exec();
  //     result = responseBuilder({ data });
  //   } catch (error) {
  //     result = responseBuilder({ error: ERROR_CODES.User.NotFound });
  //   }
  // }
  res.status(200);
});
