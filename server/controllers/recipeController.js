require('dotenv').config();
const mongoose = require('mongoose');
const Recipes = require('../models/RecipeModel');

// IMPORT RECIPE MODEL HERE

const recipeController = {};

// ------------------ Add a New Recipe --------------------- //
recipeController.addRecipe = async (req, res, next) => {
  try {
    if(res.locals.permission) {
      console.log('add recipe permission is true')
      // req.body will have the recipe
      const { recipeName, author, cookTime, tag, difficulty, ingredients, steps } = req.body;
    
      const createRecipe = await Recipes.create({
        recipeName: recipeName,
        author: author,
        cookTime: cookTime,
        tag: tag,
        difficulty: difficulty,
        ingredients: ingredients,
        steps: steps
      })
  
      res.locals.newRecipe = createRecipe;
      console.log('new recipe: ', createRecipe);
      return next();
    } else {
      console.log('add recipe permission is false')
      return next();
    }
  } catch(err) {
    return next({body: err, msg: 'Unexpected error while trying to add a recipe'})
  }

}

// ------------------- Get All Recipes --------------------- //
recipeController.getAllRecipes = async (req, res, next) => {
  try {
    if(res.locals.permission) {
      console.log('inside getallrecipes with permission true')
      const allRecipes = await Recipes.find();
      res.locals.recipes = allRecipes;
      console.log('inside getallrecipes locals.recipes', res.locals.recipes)
      return next();
    } else {
      console.log('inside getallrecipes with permission false');
      return next();
    }
  } catch (err) {
    return next({body: err, msg: 'Unexpected error while trying to retrieve all recipes'})
  }
}

// ---------------- Get a Random Recipe -------------------- //
recipeController.getRandomRecipe = async (req, res, next) => {
  try {
    if(res.locals.permission){
      
      const allRecipes = await mongoose.Model.find({});
      const randNum = Math.floor(Math.random() * allRecipes.length);
      const randomRecipe = allRecipes[randNum];
      res.locals.random = randomRecipe;
      return next();  

    }

  } catch (err) {
    return next({body: err, msg: 'Unexpected error while trying to retrieve random recipe'})
  }
}

module.exports = recipeController;