const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombreProducto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY, // Cambiado a DATEONLY
            defaultValue: DataTypes.NOW,
            get() {
                const rawValue = this.getDataValue('fecha');
                if (rawValue) {
                    const formattedDate = new Date(rawValue).toLocaleDateString('es-ES');
                    return formattedDate;
                }
                return null;
            }
        },
        canalVenta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colorTapa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoBase: {
            type: DataTypes.STRING
            // Puedes dejarlo como opcional si no siempre se necesita
        },
        colorBase: {
            type: DataTypes.STRING
            // Puedes dejarlo como opcional si no siempre se necesita
        },
        tamaño: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        },
        armada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        repasada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lustrada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        embalada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        despachada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
};
