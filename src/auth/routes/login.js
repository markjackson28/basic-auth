'use strict';

const express = require('express');
const { User } = require('../models/index');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/signin', async (req, res) => {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await User.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
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
