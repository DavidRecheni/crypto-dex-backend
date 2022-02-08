import mongoose from 'mongoose';
import User, { UserType } from '../models/User';

const userUtils = {
validUserId: (userId: string) => userId.length < 25,
mapHit: (hit: any) => ({
    username: hit._source.username,
    userId: hit._source.userId,
  }),
mapUserFind: (userBody: any) => ({
    username: { $regex: `.*${userBody?.query?.username || ''}.*`, $options: 'i' },
    name: { $regex: `.*${userBody?.query?.name || ''}.*`, $options: 'i' },
    wallet: { $regex: `.*${userBody?.query?.wallet || ''}.*` },
  }),
mapUserSave: (req: any) => ({
  _id: new mongoose.Types.ObjectId(),
  name: req?.body?.name,
  username: req?.body?.username,
  email: req?.body?.email,
  bio: req?.body?.bio,
  avatar: req?.body?.avatar,
  publicAddress: req?.body?.publicAddress,
  nonce: req?.body?.nonce
}),
}

export default userUtils

