const { sequelize } = require('../config/conn');
const { DataTypes } = require('sequelize');

// Crear la tabla
const discordEmbed = sequelize.define('discord_embed', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true // Cambiar a false luego
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    webhook_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schendule_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

// Exporamos el modelo
module.exports = discordEmbed;