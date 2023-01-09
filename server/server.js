const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Express Config
const app = express();
express.static(path.resolve(__dirname, '../public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()) // Need to pass in a cookie secret

////////////////////////////////////////////////////////////////
// ----------------------- MIDDLEWARE ------------------------ //
////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
// ----------------------- ENDPOINTS ------------------------ //
////////////////////////////////////////////////////////////////

// Login

// Signup

// Get 
app.get('/', (req, res) => {
  res.send('Hello From the Back End!')
})



app.listen(3000, () => console.log('Server running on port 3000'));