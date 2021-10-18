'use strict';

const express = require('express');
const app = express();

// Importing modules for use
const mainRoute = require('./routes/mainRoute');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const signUp = require('./routes/signup');
const signIn = require('./routes/login');

// Global Middleware
app.use(express.json());

// Routes
app.use(mainRoute);
app.use(signUp);
app.use(signIn);

// Telling app to use these error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export server to index.js for use
module.exports = {
  server: app,
  start: port => {
    if (!port) {
      throw new Error('Missing port :(');
    }
    app.listen(port, () => console.log(`Server up on ${port}`));
  }
}
