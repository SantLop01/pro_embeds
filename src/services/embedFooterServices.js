const { embedFooter } = require('../models/indexModels.js');

// Obtener el Embed Footer
const getEmbedFooter = async (embedFooterId) => {
    try {
        const embedFooterData = await embedFooter.findOne({
            where: {
                id: embedFooterId
            }
        });
        if (!embedFooterData) {
            throw new Error('No se pudo obtener el Embed Footer');
        }
        const response = {
            isError: false,
            data: embedFooterData
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo obtener el Footer del Embed por: ${e}`
        }
        return error;
    }
}

// Crear el Embed Footer
const createEmbedFooter = async (embedId, embedFooterForm) => {
    try {
        const newEmbedFooterForm = { embed_id: embedId, ...embedFooterForm };
        const createdEmbedFooter = await embedFooter.create(newEmbedFooterForm);
        const embedFooterValues = createdEmbedFooter.dataValues;
        if (!embedFooterValues) {
            throw new Error('No se pudo crear el Embed Footer');
        }
        const response = {
            isError: false,
            data: embedFooterValues
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo el Footer del Embed por: ${e}`
        }
        return error;
    }
}

// Actualizar el Embed Footer
const updateEmbedFooter = async (discordEmbedId, embedFooterForm) => {
    try {
        const [updatedEmbedFooter] = await embedFooter.update(embedFooterForm, {
            where: {
                embed_id: discordEmbedId
            }
        });
        if (!updatedEmbedFooter || updatedEmbedFooter != 1) {
            throw new Error('No se pudo actualizar el Embed Footer');
        }
        const response = {
            isError: false,
            data: embedFooterForm
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo actualizar el Footer del Embed por: ${e}`
        }
        return error;
    }
}

// Eliminar el Embed Footer
const deleteEmbedFooter = async (embedFooterId) => {
    try {
        const deletedEmbedFooter = await embedFooter.destroy({
            where: {
                id: embedFooterId
            }
        });
        if (!deletedEmbedFooter) {
            throw new Error('No se pudo eliminar el Embed Footer');
        }
        const response = {
            isError: false,
            data: deletedEmbedFooter
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No se pudo eliminar el Footer del Embed por: ${e}`
        }
        return error;
    }
}

module.exports = {
    getEmbedFooter,
    createEmbedFooter,
    updateEmbedFooter,
    deleteEmbedFooter
};