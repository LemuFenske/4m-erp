const { Order } = require('../../db');

const orderCreator = async (order) => {
    const newOrder = await Order.create(order);
    return newOrder;
};

const createOrder = async (req, res) => {
    const order = req.body;
    try {
        const newOrder = await orderCreator(order);
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = createOrder;
