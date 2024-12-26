// const { sequelize } = require('../config/conn');

/* Importamos los modelos */
const discordEmbed = require('./discordEmbeds');
const embedBody = require('./embedBody');
const embedFooter = require('./embedFooter');

/* Definimos las relaciones entre las tablas */

// Body
discordEmbed.hasOne(embedBody, { foreignKey: 'embed_id' });
embedBody.belongsTo(discordEmbed, { foreignKey: 'embed_id' });

// Footer
discordEmbed.hasOne(embedFooter, { foreignKey: 'embed_id' });
embedFooter.belongsTo(discordEmbed, { foreignKey: 'embed_id' });

/* Sincronizamos las tablas */
// sequelize.sync({ alter: true });

/* Exportamos los modelos */
module.exports = {
    discordEmbed,
    embedBody,
    embedFooter
};