import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: String,
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  bio: String,
  avatar: {
    type: {
      head: Number,
      torso: Number,
      body: Number,
    },
    required: true,
  },
  publicAddress: { type: String, unique: true, required: true },
  nonce: { type: Number, defaut: Math.floor(Math.random() * 1000000) },
});

const user = mongoose.model('User', UserSchema);

export default user;

export interface UserType {
  _id: string,
  name: string,
  username: string,
  publicAddress: string,
  bio: string,
  avatar: string,
  email: string,
  nonce: number
}
