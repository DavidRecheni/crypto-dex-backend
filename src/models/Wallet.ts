import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  coin: {type: String, required: true},
  userId: mongoose.Types.ObjectId,
  address: { type: String, required: true},
});

const wallet = mongoose.model('Wallet', WalletSchema);

export default wallet;

export interface WalletType {
  _id: string,
  coin: string,
  userId: string,
  address: string
}
