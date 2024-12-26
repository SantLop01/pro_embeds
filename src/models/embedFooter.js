const { sequelize } = require('../config/conn');
const { DataTypes } = require('sequelize');

// Crear la tabla
const embedFooter = sequelize.define('embed_footer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// Exporamos el modelo
module.exports = embedFooter;