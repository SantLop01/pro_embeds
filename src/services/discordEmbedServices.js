const { discordEmbed, embedBody, embedFooter } = require('../models/indexModels.js');

// Obtener todos los Embeds
const getAllDiscordEmbeds = async () => {
    try {
        const discordEmbeds = await discordEmbed.findAll({
            include: [
                {
                    model: embedBody,
                    as: 'embed_body'
                },
                {
                    model: embedFooter,
                    as: 'embed_footer'
                }
            ],
        });
        if (!discordEmbeds) {
            throw new Error('No se pudo obtener todos los Embeds');
        }
        const response = {
            isError: false,
            data: discordEmbeds
        };
        return response;
    } catch (e) {
        console.log(e);
        const error = {
            isError: true,
            message: `No se pudo obtener todos los Embeds por: ${e}`
        }
        return error;
    }
}

// Obtener el Embed
const getDiscordEmbed = async (discordEmbedId) => {
    try {
        const discordEmbedData = await discordEmbed.findOne({
            where: {
                id: discordEmbedId
            },
            include: [
                {
                    model: embedBody,
                    as: 'embed_body'
                },
                {
                    model: embedFooter,
                    as: 'embed_footer'
                }
            ]
        });
        if (!discordEmbedData) {
            throw new Error('No se pudo obtener el Embed');
        }
        const response = {
            isError: false,
            data: discordEmbedData
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo obtener el Embed por: ${e}`
        }
        return error;
    }
}

// Crear el Embed
const createDiscordEmbed = async (discordEmbedForm) => {
    try {
        const createdDiscordEmbed = await discordEmbed.create(discordEmbedForm);
        const discordEmbedValues = createdDiscordEmbed.dataValues;
        if (!discordEmbedValues) {
            throw new Error('No se pudo crear el Embed');
        }
        const response = {
            isError: false,
            data: discordEmbedValues
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo el Embed por: ${e}`
        }
        return error;
    }
}

// Actualizar el Embed
const updateDiscordEmbed = async (discordEmbedId, discordEmbedForm) => {
    try {
        const [updatedDiscordEmbed] = await discordEmbed.update(discordEmbedForm, {
            where: {
                id: discordEmbedId
            }
        });;
        if (!updatedDiscordEmbed || updatedDiscordEmbed != 1) {
            throw new Error('No se pudo actualizar el Embed');
        }
        const response = {
            isError: false,
            data: discordEmbedForm
        };
        return response;
    } catch (e) {
        console.log(e);
        const error = {
            isError: true,
            message: `No se pudo actualizar el Embed por: ${e}`
        }
        return error;
    }
}

// Eliminar el Embed
const deleteDiscordEmbed = async (discordEmbedId) => {
    try {
        const deletedDiscordEmbed = await discordEmbed.destroy({
            where: {
                id: discordEmbedId
            },
            include: [
                {
                    model: embedBody,
                    as: 'embed_body'
                },
                {
                    model: embedFooter,
                    as: 'embed_footer'
                }
            ]
        });
        if (!deletedDiscordEmbed) {
            throw new Error('No se pudo eliminar el Embed');
        }
        const response = {
            isError: false,
            data: deletedDiscordEmbed
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo eliminar el Embed por: ${e}`
        }
        return error;
    }
}

module.exports = {
    getDiscordEmbed,
    getAllDiscordEmbeds,
    createDiscordEmbed,
    updateDiscordEmbed,
    deleteDiscordEmbed
};