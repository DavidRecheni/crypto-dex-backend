const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  username: String,
  wallet: String,
  bio: String
})

module.exports = mongoose.model('User', userSchema)
