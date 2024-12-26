// Preview elements
const discordUrlInput = document.getElementById('discordWebhookUrl');
const discordTitleInput = document.getElementById('discordTitle');
const discordScheduleInput = document.getElementById('schenduleTime');
const discordDescriptionInput = document.getElementById('content');

// Embed Body
const embed1TitleInput = document.getElementById('embed1Title');
const embed1BodyInput = document.getElementById('embed1Body');
const embed1ImageInput = document.getElementById('embed1ImageUrl');

// Embed Footer
const embed2TitleInput = document.getElementById('embed2Title');
const embed2BodyInput = document.getElementById('embed2Body');

// Main function
document.addEventListener('DOMContentLoaded', () => {
    const embedsItems = document.querySelectorAll('.view-item');
    if (embedsItems) {
        embedsItems.forEach((embedItem) => {
            embedItem.addEventListener('click', () => {
                const itemId = embedItem.getAttribute('item-id');
                getItemPreview(itemId);
            });
        });
    }
});