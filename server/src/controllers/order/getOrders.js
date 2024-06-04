const { Order } = require('../../db');

const getOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error.message);
    } 
};

module.exports = getOrder;
