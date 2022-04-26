import mongoose from 'mongoose';
import AvatarPartSlot from '../types/AvatarPartSlot';

const FreeAvatarPartSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  available: { type: Boolean },
  avatarSlot: { type: String, required: true },
  description: { type: String },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const FreeAvatarPart = mongoose.model('FreeAvatarPart', FreeAvatarPartSchema);

export default FreeAvatarPart;

export interface FreeAvatarPartType {
  _id: string,
  available: boolean
  avatarSlot: AvatarPartSlot
  description: string,
  name: string,
  url: string
}
