const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

// Express Config
const app = express();
express.static(path.resolve(__dirname, '../public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()) // Need to pass in a cookie secret

////////////////////////////////////////////////////////////////
// ----------------------- MIDDLEWARE ----------------------- //
////////////////////////////////////////////////////////////////
const recipeController = require('./controllers/recipeController');

////////////////////////////////////////////////////////////////
// ----------------------- ENDPOINTS ------------------------ //
////////////////////////////////////////////////////////////////

// ----------------------- User Endpoints ------------------------ //

// Login
app.post('/api/login', (req, res) => {
  res.status(200).send('Logged in!')
})
// Signup
app.post('/api/signup', (req, res) => {
  res.status(200).send('New user signed up!');
})

//------------------------------------------------------------------ //

// ----------------------- Recipe Endpoints ------------------------ //

// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.status(200).json(res.locals.recipes)
})

// Get one (random) recipe
app.get('/api/random', (req, res) => {
  res.status(200).json(res.locals.random)
})

// Add a new recipe
app.post('/api/addRecipe', recipeController.addRecipe, (req, res) => {
  res.status(200).send('New recipe added!');
})

//------------------------------------------------------------------ //

// ----------------------- Global Endpoints ------------------------ //

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
})

app.use('/*', (req, res) => {
  console.log(`Unrecognized route requested: ${req.method} request to ${req.originalUrl}`);
  res.status(404).send('404: Not Found');
})

app.use((err, req, res, next) => {
  const error = {
    errorBody: err.body,
    message: err.msg
  }
  const errMsg = `${err.msg} \n ${err.body}`
  console.log(errMsg);
  res.status(500).send(errMsg)
})

// Server
app.listen(3000, () => console.log('Server running on port 3000'));