import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  username: String,
  wallet: String,
  bio: String,
  avatar: String,
});

const user = mongoose.model('User', UserSchema);

export default user;

export interface UserType {
  _id: mongoose.Types.ObjectId,
  name: string,
  username: string,
  wallet: string,
  bio: string,
  avatar: string,
}
