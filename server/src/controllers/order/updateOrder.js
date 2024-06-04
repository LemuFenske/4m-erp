const { Order } = require('../../db');

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        // Excluir el campo de la fecha si existe en los campos actualizados
        if ('fecha' in updatedFields) {
            delete updatedFields.fecha;
        }

        const [rowsUpdated] = await Order.update(updatedFields, {
            where: { id },
        });

        if (rowsUpdated === 0) {
            throw new Error('La orden no existe en la base de datos');
        }

        res.status(200).json({ message: 'Orden actualizada correctamente' });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = updateOrder;
