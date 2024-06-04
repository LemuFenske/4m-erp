const { Order } = require('../../db');

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.destroy({
            where: { id }
        });

        if (deletedOrder === 0) throw new Error('La orden no existe en la base de datos');

        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = deleteOrder;
