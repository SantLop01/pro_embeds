const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DBNAME, DBUSER, DBPASS, DBHOST, DBPORT } = process.env;

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    dialect: 'mysql',
    host: DBHOST,
    port: DBPORT
});

const conn = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ ¡Conexión con la Base de Datos exitosa!');
    } catch (error) {
        console.log('Error de conexión con la Base de Datos: ', error);
    };
};

module.exports = {
    Sequelize,
    sequelize,
    conn
}