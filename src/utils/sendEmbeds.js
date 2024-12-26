const { getAllDiscordEmbeds, deleteDiscordEmbed } = require('../services/discordEmbedServices.js');

const sendEmbeds = async (discordEmbeds) => {
    try {
        for (const embed of discordEmbeds) {
            const embedMessage = {
                content: `${embed.description}\n<@&1012887800267419759>`,
                embeds: [
                    {
                        title: embed.embed_body.title,
                        description: embed.embed_body.description,
                        color: 16566318,
                        image: {
                            url: embed.embed_body.image_url
                        }
                    },
                    {
                        title: embed.embed_footer.title,
                        description: embed.embed_footer.description,
                        color: 16566318,
                    }
                ],
                attachments: []
            };

            // Send Message
            const webhookUrl = embed.webhook_url;

            const resWithFetch = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(embedMessage)
            });

            if (resWithFetch.status !== 204) {
                return {
                    isError: true,
                    message: `Error al enviar la notificación embed en: ${embed.id}`
                };
            }

            // Delete Embed
            const deleteEmbed = await deleteDiscordEmbed(embed.id);
        };

        const response = {
            isError: false,
            data: 'Mensajes enviados correctamente'
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: e.message
        };
        return error;
    }
}

module.exports = sendEmbeds;