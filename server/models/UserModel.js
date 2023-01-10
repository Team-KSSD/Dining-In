const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;
const URI = process.env.MONGO_URI;

mongoose.connect(URI, {dbName: 'dining-in'})
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((err) => {
    console.log(`there was an error connecting to mongodb: ${err}`)
  })

  const userSchema = new Schema({
    username: {
      type: String, 
      required: true
    },
    password: {
      type: String, 
      required: true
    }
  })

const Users = mongoose.model('users', userSchema)
module.exports = Users;

// db.collection.updateOne(
//     { _id: 5f2324a89b9c9b7d2bce1a4d },
//     { $push: { tags: { name: "new_tag", color: "red" } } }
//  )