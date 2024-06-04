const { Order } = require('../../db');

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const dbResult = await Order.findByPk(id);
        if (!dbResult) throw new Error('La orden no existe en la base de datos');
        res.status(200).json(dbResult);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = getOrderById;
