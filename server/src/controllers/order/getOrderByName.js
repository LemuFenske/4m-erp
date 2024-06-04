const { Order } = require('../../db');
const { Op } = require('sequelize');

const getOrderByName = async (req, res) => {
    try {
        const name = req.query.name;

        const dbResult = await Order.findOne({
            where: {
                name: {
                    [Op.iLike]: name
                }
            }
        });

        if (!dbResult) throw new Error('No se encontró ninguna orden con ese nombre');

        res.status(200).json(dbResult);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = getOrderByName;
