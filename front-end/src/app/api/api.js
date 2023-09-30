const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI } = process.env;


mongoose.connect(MONGODB_URI, err => {
  if (err) {
    console.error('Error!' + err);
  } else {
    console.log('Connected to mongodb');
  }
});

router.get('/', (req, res) => {
  res.send('From API route !!');
});

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);  // change so that MongoDB can understand
  user.save((error, registeredUser) => {  // save into MongoDB
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredUser);
    }
  })  
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({email: userData.email}, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send('Invalid email');
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid password");
      } else {
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;
