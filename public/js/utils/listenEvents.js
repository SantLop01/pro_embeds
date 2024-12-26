import { getItemData } from '../showItem.js';
import { deleteItem } from '../deleteItem.js';

export const listenMobileSubmit = () => {
    const submitMobileBtn = document.getElementById('mobileSubmit');

    if (submitMobileBtn) {
        const submitBtn = document.getElementById('submitBtn');
        submitMobileBtn.addEventListener('click', () => {
            submitBtn.click();
        });
    }
}
 
export const listenGroupClick = () => {
    const groupsBtns = document.querySelectorAll('.group-btn');
    
    if (groupsBtns) {
        groupsBtns.forEach((groupBtn) => {
            groupBtn.addEventListener('click', () => {
                // Obtenemos el svg del svg
                const arrow = groupBtn.querySelector('.group-arrow');
                arrow.classList.toggle('rotate-90');
            });
        });
    }
}

export const listenItemClick = () => {
    const embedsItems = document.querySelectorAll('.embeds-items');
    
    if (embedsItems) {
        embedsItems.forEach((embedItem) => {
            embedItem.addEventListener('click', () => {
                const itemId = embedItem.getAttribute('item-id');
                getItemData(itemId);
            });
        });
    }
}

export const listenDeleteItemClick = () => {
    const embedsItems = document.querySelectorAll('.delete-item');
    
    if (embedsItems) {
        embedsItems.forEach((embedItem) => {
            embedItem.addEventListener('click', () => {
                const itemId = embedItem.getAttribute('item-id');
                deleteItem(itemId);
            });
        });
    }
}