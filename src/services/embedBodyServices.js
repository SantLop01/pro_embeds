const { embedBody } = require('../models/indexModels.js');

// Obtener el Embed Body
const getEmbedBody = async (embedBodyId) => {
    try {
        const embedBodyData = await embedBody.findOne({
            where: {
                id: embedBodyId
            }
        });
        if (!embedBodyData) {
            throw new Error('No se pudo obtener el Embed Body');
        }
        const response = {
            isError: false,
            data: embedBodyData
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo obtener el Body del Embed por: ${e}`
        }
        return error;
    }
}

// Crear el Embed Body
const createEmbedBody = async (embedId, embedBodyForm) => {
    try {
        const newEmbedBodyForm = { embed_id: embedId, ...embedBodyForm };
        console.log(newEmbedBodyForm);
        const createdEmbedBody = await embedBody.create(newEmbedBodyForm);
        const embedBodyValues = createdEmbedBody.dataValues;
        if (!embedBodyValues) {
            throw new Error('No se pudo crear el Embed Body');
        }
        const response = {
            isError: false,
            data: embedBodyValues
        };
        return response;
    } catch (e) {
        console.log(e);
        const error = {
            isError: true,
            message: `No se pudo el Body del Embed por: ${e}`
        }
        return error;
    }
}

// Actualizar el Embed Body
const updateEmbedBody = async (discordEmbedId, embedBodyForm) => {
    try {
        const [updatedEmbedBody] = await embedBody.update(embedBodyForm, {
            where: {
                embed_id: discordEmbedId
            }
        });
        if (!updatedEmbedBody || updatedEmbedBody != 1) {
            throw new Error('No se pudo actualizar el Embed Body');
        }
        const response = {
            isError: false,
            data: embedBodyForm
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo actualizar el Body del Embed por: ${e}`
        }
        return error;
    }
}

// Eliminar el Embed Body
const deleteEmbedBody = async (embedBodyId) => {
    try {
        const deletedEmbedBody = await embedBody.destroy({
            where: {
                id: embedBodyId
            }
        });
        if (!deletedEmbedBody) {
            throw new Error('No se pudo eliminar el Embed Body');
        }
        const response = {
            isError: false,
            data: deletedEmbedBody
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo eliminar el Body del Embed por: ${e}`
        }
        return error;
    }
}

module.exports = {
    getEmbedBody,
    createEmbedBody,
    updateEmbedBody,
    deleteEmbedBody
};