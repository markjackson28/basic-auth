'use strict';

const express = require('express');
const basicAuth = require('../auth/basicAuth');
const router = express.Router();

router.post('/signin', basicAuth, async (req, res) => {
  let user = req.body.user;
  res.status(200).json(user);
});

module.exports = router;
