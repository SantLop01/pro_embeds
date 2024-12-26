const discordEmbedServices = require('../services/discordEmbedServices');
const moment = require('moment');

const viewHome = (req, res) => {
    res.render('home', {
        title: 'Home',
        name: 'Home'
    });
}

const viewSchendules = (req, res) => {
    res.render('schendules', {
        title: 'Schendules',
        name: 'Schendules'
    });
}

const viewEmbedPreview = async (req, res) => {
    const discordEmbedId = req.params.id;
    const discordEmbedData = await discordEmbedServices.getDiscordEmbed(discordEmbedId);
    
    if (discordEmbedData.isError) {
        return res.status(500).redirect(req.get('referer'));
    }

    const scheduledTime = moment(discordEmbedData.data.schendule_time);
    let parsedScheduledTime = null;
    
    if (scheduledTime.isValid()) {
        parsedScheduledTime = scheduledTime.format('YYYY-MM-DDTHH:mm');
    } else {
        console.error("Hora programada no válida");
        discordEmbedData.data.schendule_time = null;
    }

    res.render('preview', {
        title: 'Preview',
        name: 'Preview',
        discordEmbed: discordEmbedData.data,
        scheduledTime: parsedScheduledTime
    });
};
module.exports = {
    viewHome,
    viewSchendules,
    viewEmbedPreview
};