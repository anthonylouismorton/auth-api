'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes.js');
const foodModel = require('./food.js');
const usersModel = require('./users.js')
const Collection = require('../Data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes)
const clothes = clothesModel(sequelize, DataTypes)
const users = usersModel(sequelize, DataTypes)

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: usersModel(sequelize, DataTypes)
};




