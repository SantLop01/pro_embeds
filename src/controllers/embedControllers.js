const discordEmbedServices = require('../services/discordEmbedServices');
const embedBodyServices = require('../services/embedBodyServices');
const embedFooterServices = require('../services/embedFooterServices');

const getAllEmbeds = async (req, res) => {
    try {
        const discordEmbeds = await discordEmbedServices.getAllDiscordEmbeds();
        if (discordEmbeds.isError) {
            const error = {
                isError: true,
                message: 'No se pudo obtener todos los Embeds'
            };
            return res.status(500).json(error);
        }
        const response = {
            isError: false,
            data: discordEmbeds
        };
        return res.status(200).json(response);
    } catch (e) {
        const error = {
            isError: true,
            message: e.message
        };
        return res.status(500).json(error);
    }
};

const getOneEmbed = async (req, res) => {
    const discordEmbedId = req.params.id;
    try {
        const discordEmbedData = await discordEmbedServices.getDiscordEmbed(discordEmbedId);
        if (discordEmbedData.isError) {
            const error = {
                isError: true,
                message: 'No se pudo obtener el Embed'
            };
            res.status(500).json(error);
        }
        const response = {
            isError: false,
            data: discordEmbedData
        };
        res.status(200).json(response);
    } catch (e) {
        const error = {
            isError: true,
            message: e.message
        };
        res.status(500).json(error);
    }
};

const createEmbed = async (req, res) => {
    const bodyForm = req.body;
    const discordForm = bodyForm.discordEmbed;
    const embedBodyForm = bodyForm.embedBody;
    const embedFooterForm = bodyForm.embedFooter;

    try {
        const discordEmbedData = await discordEmbedServices.createDiscordEmbed(discordForm);
        const embedId = discordEmbedData.data.id;
        if (!embedId) {
            throw new Error('No se pudo crear el Embed');
        };
        const embedBodyData = await embedBodyServices.createEmbedBody(embedId, embedBodyForm);
        const embedFooterData = await embedFooterServices.createEmbedFooter(embedId, embedFooterForm);

        if (discordEmbedData.isError || embedBodyData.isError || embedFooterData.isError) {
            const error = {
                isError: true,
                message: 'No se pudo crear el Embed'
            };
            return res.status(500).json(error);
        }

        const response = {
            isError: false,
            data: {
                discordEmbed: discordEmbedData,
                embedBody: embedBodyData,
                embedFooter: embedFooterData
            },
            message: 'Embed creado correctamente'
        };
        return res.status(200).json(response);
    } catch (e) {
        const error = {
            isError: true,
            message: e.message
        };
        return res.status(500).json(error);
    }
};

const updateEmbed = async (req, res) => {
    const discordEmbedId = req.params.id;
    console.log(discordEmbedId);
    const bodyForm = req.body;
    const discordForm = bodyForm.discordEmbed;
    const embedBodyForm = bodyForm.embedBody;
    const embedFooterForm = bodyForm.embedFooter;

    try {
        const discordEmbedData = await discordEmbedServices.updateDiscordEmbed(discordEmbedId, discordForm);
        const embedBodyData = await embedBodyServices.updateEmbedBody(discordEmbedId, embedBodyForm);
        const embedFooterData = await embedFooterServices.updateEmbedFooter(discordEmbedId, embedFooterForm);

        if (discordEmbedData.isError || embedBodyData.isError || embedFooterData.isError) {
            console.log(discordEmbedData);
            console.log(embedBodyData);
            console.log(embedFooterData);
            const error = {
                isError: true,
                message: 'No se pudo actualizar el Embed'
            };
            return res.status(500).json(error);
        }

        const response = {
            isError: false,
            data: {
                discordEmbed: discordEmbedData,
                embedBody: embedBodyData,
                embedFooter: embedFooterData
            },
            message: 'Embed actualizado correctamente'
        };
        return res.status(200).json(response);
    } catch (e) {
        const error = {
            isError: true,
            message: e.message
        };
        return res.status(500).json(error);
    }
};

const deleteEmbed = async (req, res) => {
    const discordEmbedId = req.params.id;
    try {
        const discordEmbedData = await discordEmbedServices.deleteDiscordEmbed(discordEmbedId);
        if (discordEmbedData.isError) {
            throw new Error('No se pudo eliminar el Embed');
        }
        const response = {
            isError: false,
            data: discordEmbedData
        };
        res.status(200).json(response);
    } catch (e) {
        const error = {
            isError: true,
            message: e.message
        };
        res.status(500).json(error);
    }
};

module.exports = {
    getAllEmbeds,
    getOneEmbed,
    createEmbed,
    updateEmbed,
    deleteEmbed
};