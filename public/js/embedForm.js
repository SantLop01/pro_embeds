import { listenMobileSubmit } from "./utils/listenEvents.js";
import { preventMinutes } from "./utils/helpers.js";

// Init for mobile submit button
window.addEventListener('DOMContentLoaded', () => {
    listenMobileSubmit();
    preventMinutes();
});

// Form submission
const webhookForm = document.querySelector('#webhookForm');

webhookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(webhookForm);
    let data = {
        discordEmbed: {
            title: formData.get('discordTitle'),
            description: formData.get('discordDescription'),
            webhook_url: formData.get('discordWebhookUrl'),
            schendule_time: formData.get('schenduleTime')
        }
    };

    // Add first embed if title exists
    if (formData.get('embed1Title')) {
        const embedBody = {
            author: formData.get('embed1Author'),
            author_url: formData.get('embed1AuthorUrl'),
            icon_url: formData.get('embed1IconUrl'),
            title: formData.get('embed1Title'),
            description: formData.get('embed1Body'),
            image_url: formData.get('embed1ImageUrl')
        }
        data = { ...data, embedBody };
    }

    // Add second embed if title exists
    if (formData.get('embed2Title')) {
        const embedFooter = {
            title: formData.get('embed2Title'),
            description: formData.get('embed2Body')
        }
        data = { ...data, embedFooter };
    }

    // Get current page
    const currentPage = formData.get('currentPage');
    const discordEmbedId = formData.get('discordEmbedId');

    // Send data to server
    try {
        const submitUrl = currentPage === 'preview' ? `/embed/update/${discordEmbedId}` : '/embed/create';
        const methodType = currentPage === 'preview' ? 'PUT' : 'POST';

        const response = await fetch(submitUrl, {
            method: methodType,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send webhook');
        }

        if (currentPage === 'preview') {
            alert('¡Embed actualizado correctamente!');
        } else {
            alert('¡Embed programado correctamente!');
        }
    } catch (error) {
        alert('Error al enviar mensaje: ' + error.message);
    }
});