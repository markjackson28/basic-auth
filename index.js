'use strict';

require('dotenv').config;

// importing server and db for use
const server = require('./src/server');
const { db } = require('./src/models/index');

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3000);
  })
  .catch(console.error);
