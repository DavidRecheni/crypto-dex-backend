import mongoose from 'mongoose';

const FreeAvatarPartSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  available: { type: Boolean },
});

const freeAvatarPart = mongoose.model('FreeAvatarPart', FreeAvatarPartSchema);

export default freeAvatarPart;

export interface FreeAvatarPartType {
  _id: string,
  name: string,
  description: string,
  url: string
  available: boolean
}
