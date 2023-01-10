const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const Users = require('../models/UserModel');

const userController = {};
//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

// ------------------------- Add a New User -------------------------- //
userController.addUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const addNew = await Users.create({username: username, password: password});
        console.log('User added? addNew', addNew)
        res.locals.newUser = addNew;
        return next();
        
    } catch(err) {
        return next({error: err, msg: 'Unexpected error while trying to add a user'})
    }
}


userController.verifyUser = async (req, res, next) => {
  const {username, password} = req.body;
  console.log('inside verify user, is there a session key?', req.session)
  try {
    const findUser = await Users.findOne({username: username, password: password});
    console.log('found User?', findUser);
    if (findUser) {
        res.locals.currentUser = findUser;
        session=req.session;
        session.userid=req.body.username;
        console.log('request session: ', req.session)
    } else {
        res.locals.currentUser = false;
    }
    return next();

  } catch(err) {
    return next({error: err, msg: 'Unexpected error while trying to verify a user'})
  }
//   if(req.body.username == myusername && req.body.password == mypassword){
//     session=req.session;
//     session.userid=req.body.username;
//     console.log(req.session)
//     res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
// }
// else{
//     res.send('Invalid username or password');
// }

}

userController.isLoggedIn =(req, res, next) => {
    session=req.session;
    if(session.userid){
        res.locals.permission = true;
        // res.send("Welcome User <a href=\'/logout'>click to logout</a>");
        return next();
    }else{
    //   res.sendFile('views/index.html',{root:__dirname})
    res.locals.permission = false;
      return next();
    }
}





// app.get('/',(req,res) => {
//     session=req.session;
//     if(session.userid){
//         res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     }else
//     res.sendFile('views/index.html',{root:__dirname})
// });

// app.post('/user',(req,res) => {
//     if(req.body.username == myusername && req.body.password == mypassword){
//         session=req.session;
//         session.userid=req.body.username;
//         console.log(req.session)
//         res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
//     }
//     else{
//         res.send('Invalid username or password');
//     }
// })

// app.get('/logout',(req,res) => {
//     req.session.destroy();
//     res.redirect('/');
// });

// app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

module.exports = userController;