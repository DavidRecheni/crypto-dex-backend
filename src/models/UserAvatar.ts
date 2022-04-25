import mongoose from 'mongoose';
import OwnedAvatarPart from './OwnedAvatarPart';

const UserAvatarSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  url: { type: String, required: true },
  parts: { type: [OwnedAvatarPart] },
});

const userAvatar = mongoose.model('UserAvatar', UserAvatarSchema);

export default userAvatar;

export interface UserAvatarType {
  _id: string,
  name: string,
  description: string,
  url: string
  available: boolean
}
