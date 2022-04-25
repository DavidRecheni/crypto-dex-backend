import mongoose from 'mongoose';
import AvatarPartSlot from '../types/AvatarPartSlot';

const OwnedAvatarPartSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  active: { type: Boolean, default: false },
  avatarSlot: { type: String, required: true },
  description: { type: String },
  name: { type: String, required: true },
  url: { type: String, required: true },
  userId: mongoose.Types.ObjectId,
});

const OwnedAvatarPart = mongoose.model('OwnedAvatarPart', OwnedAvatarPartSchema);

export default OwnedAvatarPart;

export interface OwnedAvatarPartType {
  _id: string,
  active: boolean,
  avatarSlot: AvatarPartSlot,
  description: string,
  name: string,
  url: string
  userId: string,
}
