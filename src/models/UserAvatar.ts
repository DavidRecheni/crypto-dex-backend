import mongoose from 'mongoose';

const UserAvatarSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
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
