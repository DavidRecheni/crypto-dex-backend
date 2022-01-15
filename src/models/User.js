const mongoose = require('mongoose')
const mongoosastic = require("mongoosastic");

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, es_indexed: true },
  username: String,
  wallet: String,
  bio: String,
  avatar: String
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

var User = mongoose.model("User", userSchema);
module.exports = User




// userSchema.plugin(mongoosastic,{
//   hosts: [
//       "https://search-cryptodex-elastic-ivg4rnchvfsezqrfsv6qt3mlva.eu-central-1.es.amazonaws.com"
//   ],
//   port: "443",
//   protocol: "https",
//   auth: "goblinMaster:LernerPresidente2022!"
// //  ,curlDebug: true
// });

// User.createMapping(function(err, mapping){
//   if(err){
//     console.log('error creating mapping (you can safely ignore this)');
//     console.log(err);
//   }else{
//     console.log('mapping created!');
//     console.log(mapping);
//   }
// });