// Form elements
const webhookForm = document.getElementById('webhookForm');
const contentArea = document.getElementById('content');
const contentCounter = document.getElementById('contentCounter');
const clearAllButton = document.getElementById('clearAll');

// Preview elements
const preview = document.getElementById('preview');
const embed1Preview = document.getElementById('embed1Preview');
const embed1TitlePreview = document.getElementById('embed1TitlePreview');
const embed1BodyPreview = document.getElementById('embed1BodyPreview');
const embed1ImagePreview = document.getElementById('embed1ImagePreview');
const embed2Preview = document.getElementById('embed2Preview');
const embed2TitlePreview = document.getElementById('embed2TitlePreview');
const embed2BodyPreview = document.getElementById('embed2BodyPreview');

// Content counter
contentArea.addEventListener('input', () => {
    const length = contentArea.value.length;
    contentCounter.textContent = `${length}/2000`;
    if (length === 0) return;
    preview.innerHTML = marked.parse(contentArea.value, { breaks: true });
});

// Clear all button
clearAllButton.addEventListener('click', () => {
    webhookForm.reset();
    preview.innerHTML = '';
    embed1Preview.classList.add('hidden');
    embed2Preview.classList.add('hidden');
    contentCounter.textContent = '0/2000';
});

// Live preview for embeds
const embed1TitleInput = document.querySelector('[name="embed1Title"]');
const embed1BodyInput = document.querySelector('[name="embed1Body"]');
const embed1ImageUrlInput = document.querySelector('[name="embed1ImageUrl"]');
const embed2TitleInput = document.querySelector('[name="embed2Title"]');
const embed2BodyInput = document.querySelector('[name="embed2Body"]');

embed1TitleInput.addEventListener('input', (e) => {
    embed1TitlePreview.textContent = e.target.value;
    embed1Preview.classList.toggle('hidden', !e.target.value);
});

embed1BodyInput.addEventListener('input', (e) => {
    embed1BodyPreview.innerHTML = marked.parse(e.target.value, { breaks: true });
});

embed1ImageUrlInput.addEventListener('input', (e) => {
    if (e.target.value) {
        embed1ImagePreview.src = e.target.value;
        embed1ImagePreview.classList.remove('hidden');
    } else {
        embed1ImagePreview.classList.add('hidden');
    }
});

// Repetir para embed2
embed2TitleInput.addEventListener('input', (e) => {
    embed2TitlePreview.textContent = e.target.value;
    embed2Preview.classList.toggle('hidden', !e.target.value);
});

embed2BodyInput.addEventListener('input', (e) => {
    embed2BodyPreview.innerHTML = marked.parse(e.target.value, { breaks: true });
});

// Disparar eventos manualmente después de establecer los valores
const triggerInputEvent = (input) => {
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
};

// Establecer valores iniciales y disparar eventos
triggerInputEvent(embed1TitleInput);
triggerInputEvent(embed1BodyInput);
triggerInputEvent(embed1ImageUrlInput);
triggerInputEvent(embed2TitleInput);
triggerInputEvent(embed2BodyInput);
triggerInputEvent(contentArea);