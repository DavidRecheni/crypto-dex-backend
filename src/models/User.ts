import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, immutable: true, auto: true },
  name: String,
  username: {
    type: String, unique: true, required: true, immutable: true,
  },
  email: { type: String, unique: true },
  bio: String,
  publicAddress: {
    type: String, unique: true, required: true, immutable: true,
  },
  nonce: { type: Number, required: true },
});

const user = mongoose.model('User', UserSchema);

export default user;

export interface UserType {
  _id: string,
  name: string,
  username: string,
  publicAddress: string,
  bio: string,
  email: string,
  nonce: number
}
