/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { Router } from 'express';
import responseBuilder from '../../utils/responseBuilder';
import ERROR_CODES from '../../constant';
import User, { UserType } from '../../models/User';
import { indexUser } from '../../services/openSearchService';

const router = Router();

/**
 * Create a new user and indexes for quicker search
 */
router.post('/user', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Create a new user'

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req?.body?.name,
    username: req?.body?.username,
    wallet: req?.body?.wallet,
    bio: req?.body?.bio,
    avatar: req?.body?.avatar,
  });

  user.save().then((newUser: UserType) => {
    indexUser(newUser.username, newUser._id.toString());
    res.status(200).json(responseBuilder({ data: newUser }));
  }).catch(() => {
    res.status(200).json(responseBuilder({ error: ERROR_CODES.User.UnableToCreate }));
  });
});

export default router;
