require('dotenv').config();
const mongoose = require('mongoose');

// IMPORT RECIPE MODEL HERE

const recipeController = {};

// ------------------ Add a New Recipe --------------------- //
recipeController.addRecipe = async (req, res, next) => {
  try {
    // req.body will have the recipe
    // const {details } = req.body;
  
    const newRecipe = await mongoose.Model.create({
      // add mongoDB document here
      
    })
  
    // res.locals.newRecipe = newRecipe;
    // console.log('new recipe: ', newRecipe);
    console.log('new recipe added! ', req.body);
    return next();

  } catch(err) {
    return next({body: err, msg: 'Unexpected error while trying to add a recipe'})
  }

}

// ------------------- Get All Recipes --------------------- //
recipeController.getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await mongoose.Model.find({});
    res.locals.recipes = allRecipes;
    return next();
  } catch (err) {
    return next({body: err, msg: 'Unexpected error while trying to retrieve all recipes'})
  }
}

// ---------------- Get a Random Recipe -------------------- //
recipeController.getRandomRecipe = async (req, res, next) => {
  try {
    const allRecipes = await mongoose.Model.find({});
    const randNum = Math.floor(Math.random() * allRecipes.length);
    const randomRecipe = allRecipes[randNum];
    res.locals.random = randomRecipe;
    return next();  

  } catch (err) {
    return next({body: err, msg: 'Unexpected error while trying to retrieve random recipe'})
  }
}

module.exports = recipeController;