'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');

let basicAuth = async (req, res, next) => {

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await User.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      console.log('Cool Beans You made it BroChacho');
      req.body.user = user;
      next();
    }
  } catch (e) {
    res.status(403).send("Invalid Login");
  }
}

module.exports = basicAuth;
