const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  username: String,
  wallet: String,
  bio: String,
  avatar: String
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

var User = mongoose.model("User", userSchema);

module.exports = User