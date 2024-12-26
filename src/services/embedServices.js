const { discordEmbed, embedBody, embedFooter } = require('../models/indexModels.js');

const createNewEmbed = async (embedForm) => {
    try {
        const { discordForm, embedBodyForm, embedFooterForm } = embedForm;

        const discordEmbedData = {
            title: discordForm.title,
            description: discordForm.description,
            webhook_url: discordForm.webhook_url,
            schendule_time: discordForm.schendule_time
        };

        const embedBodyData = {
            author: embedBodyForm.author,
            author_url: embedBodyForm.author_url,
            icon_url: embedBodyForm.icon_url,
            title: embedBodyForm.title,
            description: embedBodyForm.description,
            image_url: embedBodyForm.image_url
        };

        const embedFooterData = {
            title: embedFooterForm.title,
            description: embedFooterForm.description
        };

        const createdDiscordEmbed = await discordEmbed.create(discordEmbedData);
        const createdEmbedBody = await embedBody.create(embedBodyData);
        const createdEmbedFooter = await embedFooter.create(embedFooterData);

        
    } catch (e) {
        const error = {
            isError: true,
            message: e.message,
        }
        return error;
    }
}

module.exports = {
    createNewEmbed
};