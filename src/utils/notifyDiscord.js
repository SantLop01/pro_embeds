const notifyDiscord = async (embed) => {
    try {
        const embedMessage = {
            content: embed.description,
            embeds: [
                {
                    title: embed.embed_body.title,
                    description: embed.embed_body.description,
                    color: 4379355,
                    image: {
                        url: embed.embed_body.image_url
                    }
                },
                {
                    title: embed.embed_footer.title,
                    description: embed.embed_footer.description,
                    color: 4379355,
                }
            ],
            attachments: []
        };
        JSON.stringify(embedMessage);
    
        // Send Message
        const webhookUrl = embed.webhook_url;
    
        const resWithFetch = fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: embedMessage
        });

        if (resWithFetch.status != 204) {
            throw new Error('Error al enviar la notificación embed');
        };
    } catch (error) {
        console.error(`Error al enviar notificación para el embed ${embed.id}:`, error);
    }
}

module.exports = notifyDiscord;