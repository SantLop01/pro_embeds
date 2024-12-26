export const deleteItem = async (itemId) => {
    try {
        if (!itemId) {
            throw new Error('No se pudo obtener el itemId');
        }

        const userConfirmed = confirm("¿Estás seguro de que deseas eliminar este Embed?");

        if (!userConfirmed) {
            return;
        } 

        // Obtener el item
        const response = await fetch(`/embed/delete/${itemId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to get embed');
        }
        const { data } = await response.json();
        if (data.isError) {
            throw new Error('Failed to get embed');
        }
        alert('¡El Embed se ha eliminado correctamente!');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}