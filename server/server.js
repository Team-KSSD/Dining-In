const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const path = require('path');
require("dotenv").config();

// Express Config
const app = express();
express.static(path.resolve(__dirname, '../public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()) // Need to pass in a cookie secret

//session middleware
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: 86400000 },
  resave: false
}));


////////////////////////////////////////////////////////////////
// ----------------------- MIDDLEWARE ----------------------- //
////////////////////////////////////////////////////////////////
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const URI = process.env.MONGO_URI;

// DB connection
mongoose.connect(URI, {dbName: 'dining-in'})
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((err) => {
    console.log(`there was an error connecting to mongodb: ${err}`)
  })


////////////////////////////////////////////////////////////////
// ----------------------- ENDPOINTS ------------------------ //
////////////////////////////////////////////////////////////////

// ----------------------- User Endpoints ------------------------ //

// Check session (home page)
app.get('/home', userController.isLoggedIn, (req, res) => {
  // res.status(200).send(res.locals.permission)
  res.sendFile('../client/public/index.html')
});

// Login
app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log(res.locals.currentUser);
  // console.log('response: ', res);
  res.status(200).send(res.locals.currentUser); 
})

// Signup
app.post('/api/signup', userController.addUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
})

// Logout
app.get('/api/logout', (req,res) => {
    // console.log("body and session", req.body, req.session);
    console.log("req in loggout before destroy", req.session)
    req.session.destroy();
    console.log("you've been logged out?!")
    console.log(req.session)
    // res.redirect('/');
    // return next();
});

//////sam add

////sam end

//------------------------------------------------------------------ //

// ----------------------- Recipe Endpoints ------------------------ //

// Get all recipes
app.get('/api/recipes', userController.isLoggedIn, recipeController.getAllRecipes, (req, res) => {
  if (res.locals.permission) {
    res.status(200).json(res.locals.recipes)
  } else {
    res.redirect('/');
  }
})
// Get one specific recipe
app.get('/api/recipes/:id', userController.isLoggedIn, recipeController.getRandomRecipe, (req, res) => {
  if (res.locals.permission) {
    res.status(200).json(res.locals.recipe)
  } else {
    res.redirect('/');
  }
})
// Get one (random) recipe
app.get('/api/random', userController.isLoggedIn, recipeController.getRandomRecipe, (req, res) => {
  if (res.locals.permission) {
    res.status(200).json(res.locals.random)
  } else {
    res.redirect('/');
  }
})

// Add a new recipe
app.post('/api/addRecipe', userController.isLoggedIn, recipeController.addRecipe, (req, res) => {
  if (res.locals.permission) {
    res.status(200).send('New recipe added!');
  } else {
    res.redirect('/');
  }
})

// Add a new review
app.post('/api/addReview', userController.isLoggedIn, recipeController.addReview, (req, res) => {
  if (res.locals.permission) {
    res.status(200).send('New review added!');
  } else {
    res.redirect('/');
  }
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

// Global error handler
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