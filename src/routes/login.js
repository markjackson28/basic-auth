'use strict';

const express = require('express');
const { User } = require('../models/index');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  // console.log('decoded string', decodedString);
  let [username, password] = decodedString.split(':');
  // console.log('un and pw', username, password);
  try {
    const user = await User.findOne({ where: { username: username } });
    // console.log('user', user.username)
    const valid = await bcrypt.compare(password, user.password);
    console.log('valid', password, user.password);
    // console.log(valid);
    if (valid) {
      console.log('Cool Beans You made it BroChacho');
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid user');
    }
  } catch (e) {
    res.status(403).send('Invalid Login');
    console.log('error message', e);
  }
});

module.exports = router;
