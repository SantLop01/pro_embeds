const cron = require('node-cron');
const DiscordEmbedServices = require('../services/discordEmbedServices');
const sendEmbeds = require('../utils/sendEmbeds');

const cronJobs = async () => {
    try {
        // Obtener todos los embeds
        const discrodEmbeds = await DiscordEmbedServices.getAllDiscordEmbeds();
        if (discrodEmbeds.isError) {
            throw new Error(discrodEmbeds.message);
        }

        // Filtrar embeds que ya se pueden enviar
        const embedsToSend = discrodEmbeds.data.filter(embed => new Date(embed.schendule_time) <= new Date());
        console.log(embedsToSend);
        if (embedsToSend.length === 0) {
            console.log('✅ No hay mensajes programados');
            return;
        }

        // Enviar embeds
        const sendEmbedsMsg = await sendEmbeds(embedsToSend);
        if (sendEmbedsMsg.isError) {
            throw new Error(sendEmbedsMsg.message);
        }

        console.log('✅ Menajes Enviados');
    } catch (error) {
        console.error('❌ Error durante el envio de mensajes: ', error);
    } finally {
        console.log('✅ Tarea finalizada');
    }
}

// Programar embeds
cron.schedule('0 */1 * * *', cronJobs);