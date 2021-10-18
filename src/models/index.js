'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user');

const sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

module.exports = {
    db: sequelize,
    User: UserModel(sequelize, DataTypes)
};

