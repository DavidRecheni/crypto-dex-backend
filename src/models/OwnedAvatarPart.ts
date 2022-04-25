import mongoose from 'mongoose';

const OwnedAvatarPartSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: false },
  url: { type: String, required: true },
});

const ownedAvatarPart = mongoose.model('OwnedAvatarPart', OwnedAvatarPartSchema);

export default ownedAvatarPart;

export interface OwnedAvatarPartType {
  _id: string,
  userId: string,
  name: string,
  description: string,
  active: boolean,
  url: string
}
