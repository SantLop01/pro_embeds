const { sequelize } = require('../config/conn');
const { DataTypes } = require('sequelize');

// Crear la tabla
const embedBody = sequelize.define('embed_body', {
    embed_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    icon_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Exporamos el modelo 
module.exports = embedBody;