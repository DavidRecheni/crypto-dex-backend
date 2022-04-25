import mongoose from 'mongoose';

const UserAvatarSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  url: { type: String, required: true },
  parts: { type: [mongoose.Types.ObjectId] },
});

const UserAvatar = mongoose.model('UserAvatar', UserAvatarSchema);

export default UserAvatar;

export interface UserAvatarType {
  _id: string,
 userId: string,
 url: string,
 parts: string[]
}
