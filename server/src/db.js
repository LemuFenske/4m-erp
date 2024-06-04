require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const OrderModel = require('./models/Order');

// const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/4m-erp`, {
//   logging: false,
// });

const database = new Sequelize(DB_DEPLOY, {
  logging: false,
});

OrderModel(database);

const { Order } = database.models;

module.exports = { database, Order };





