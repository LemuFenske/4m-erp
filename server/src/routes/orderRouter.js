const updateOrder = require('../controllers/order/updateOrder');
const getOrders = require('../controllers/order/getOrders');
const getOrderById = require('../controllers/order/getOrderById');
const getOrderByName = require('../controllers/order/getOrderByName');
const deleteOrder = require('../controllers/order/deleteOrder');
const createOrder = require('../controllers/order/createOrder');
const processEmails = require('../controllers/processEmailsController');

const { Router } = require('express');
const orderRouter = Router();

orderRouter.post('/process-emails', processEmails);
orderRouter.get('/', getOrders)
orderRouter.get('/name', getOrderByName);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);
orderRouter.post('/', createOrder);

module.exports = orderRouter;
