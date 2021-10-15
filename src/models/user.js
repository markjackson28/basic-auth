'use strict';

const bcrypt = require('bcrypt');

const UserModel = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  user.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 5)
      .then(hashedPassword => {
        user.password = hashedPassword;
      });
  });
  return user;
}

module.exports = UserModel;
