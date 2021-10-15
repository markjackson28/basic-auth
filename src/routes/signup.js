'use strict';

const express = require('express');
const { User } = require('../models/index');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const record = await User.create(req.body);
    console.log(req.body.password);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send("Error Creating User");
    console.log('Signup Error', e);
  }
});

module.exports = router;
