export const showItemPreview = (item) => {
    // Preview elements
    const preview = document.getElementById('preview');
    const embed1Preview = document.getElementById('embed1Preview');
    const embed2Preview = document.getElementById('embed2Preview');
    const embed1TitlePreview = document.getElementById('embed1TitlePreview');
    const embed1BodyPreview = document.getElementById('embed1BodyPreview');
    const embed1ImagePreview = document.getElementById('embed1ImagePreview');
    const embed2TitlePreview = document.getElementById('embed2TitlePreview');
    const embed2BodyPreview = document.getElementById('embed2BodyPreview');

    // Set preview content
    preview.innerHTML = marked.parse(item.description, { breaks: true });
    embed1Preview.classList.remove('hidden');
    embed2Preview.classList.remove('hidden');
    embed1TitlePreview.textContent = item.embed_body.title;
    embed1BodyPreview.innerHTML = marked.parse(item.embed_body.description, { breaks: true });
    embed1ImagePreview.classList.remove('hidden');
    embed1ImagePreview.src = item.embed_body.image_url;
    embed2TitlePreview.textContent = item.embed_footer.title;
    embed2BodyPreview.innerHTML = marked.parse(item.embed_footer.description, { breaks: true });

    // Desplazamos a la vista previa
    const previewSection = document.getElementById('previewSection')
    previewSection.scrollIntoView({ behavior: 'smooth' });
}

export const getItemData = async (itemId) => {
    try {
        if (!itemId) {
            throw new Error('No se pudo obtener el itemId');
        }

        // Obtener el item
        const response = await fetch(`/embed/one/${itemId}`);
        if (!response.ok) {
            throw new Error('Failed to get embed');
        }
        const { data } = await response.json();
        if (data.isError) {
            throw new Error('Failed to get embed');
        }
        const item = data.data;
        console.log(item);

        // Set preview content
        showItemPreview(item);
    } catch (error) {
        console.log(error);
    }
}