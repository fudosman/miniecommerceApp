const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb://localhost:27017/myapp',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  // for parsing application/json
  app.use(express.json()) ;
  // for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true })) ;
  // for adding images to our image folder
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  // the routes are registered on the /routes folder 
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;

