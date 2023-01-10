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

const recipeSchema = new Schema({
  cookTime: {
    type: Number, 
    required: true
  },
  tag: [String],
  difficulty: {
    type: String,
    required: true
  },
  ingredients: [{
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String, 
      required: true
    },
    item: {
      type: String,
      required: true
    }
  }],
  steps: [{
    type: String,
    required: true
  }]
})

const Recipes = mongoose.model('recipes', recipeSchema);
module.exports = Recipes;

// db.collection.updateOne(
//     { _id: 5f2324a89b9c9b7d2bce1a4d },
//     { $push: { tags: { name: "new_tag", color: "red" } } }
//  )