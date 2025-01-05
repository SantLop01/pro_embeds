import { listenItemClick, listenGroupClick, listenDeleteItemClick } from './utils/listenEvents.js';
const embedsList = document.getElementById('embedsList');

// Get Embeds
const getEmbeds = async () => {
    try {
        const response = await fetch('/embed/all');
        if (!response.ok) {
            throw new Error('Failed to get embeds');
        }

        const { data } = await response.json();
        if (data.isError) {
            throw new Error('Failed to get embeds');
        }
        
        // Agrupar embeds por título
        const groupedEmbeds = data.data.reduce((acc, embed) => {
            if (!acc[embed.title]) {
                acc[embed.title] = [];
            }
            acc[embed.title].push(embed);
            return acc;
        }, {});

        embedsList.innerHTML = '';

        // Crear secciones desplegables para cada grupo
        Object.entries(groupedEmbeds).forEach(([title, embeds]) => {
            const groupDiv = document.createElement('div');

            const titleButton = document.createElement('button');
            titleButton.className = "group-btn w-full flex items-center gap-2 text-left p-2 px-3 bg-[#2b2d31] border border-slate-400/20 rounded-lg";
            titleButton.innerHTML = `
                <span class="w-auto font-semibold">
                    ${embeds.length}
                </span>
                <span class="w-full">
                    ${title}
                </span>
                <svg class="w-5 h-5 text-slate-100 group-arrow transition-all duration-300" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12L7.72 5.03a.75.75 0 0 1 1.06-1.06z" clipRule="evenodd"/></svg>
            `;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = "hidden mt-2";

            titleButton.addEventListener('click', () => {
                contentDiv.classList.toggle('hidden');
            });

            embeds.forEach((embed) => {
                const chapter = embed.embed_footer.description.split('/');
                const chapterName = chapter[chapter.length - 2];
                
                // Cambiar a moment
                const date = moment(embed.schendule_time);
                const scheduleTime = date.format("DD-MM-YYYY HH:mm:ss");
                
                const embedLi = document.createElement('li');
                embedLi.className = "flex rounded-lg p-2 bg-[#2b2d31] dark:bg-gray-100 border border-slate-200/30 transition-colors duration-300 hover:border-slate-200 group mb-2";
                embedLi.innerHTML = `
                    <div class="embeds-items w-full flex cursor-pointer" item-id="${embed.id}">
                        <img 
                            src="${embed.embed_body.image_url}" 
                            class="object-cover rounded-lg sm:block" 
                            alt="${embed.title}"
                            width="40"
                            height="40"
                        >
                        <div class="ml-2 truncate my-auto w-full">
                            <div class="flex flex-col items-start max-w-full">
                                <p class="font-medium truncate text-left">
                                    ${chapterName ? chapterName : 'No Numerado'}
                                </p>
                                <div class="flex flex-row flex-wrap items-center gap-1 text-sm text-slate-300 truncate">
                                    <span>Programado para: </span> <span class="flex text-slate-50 mt-0.5">${scheduleTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pl-2 my-auto flex gap-2.5 md:gap-2">
                        <a href="/embed-preview/${embed.id}" class="view-item text-xl md:px-2 transition-opacity">
                            <svg class="w-5 h-5 md:w-6 md:h-6 text-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.036 12.322a1 1 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178c.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"/></g></svg>
                        </a>
                        <a href="/embed-preview/${embed.id}" class="text-xl md:px-2 transition-opacity">
                            <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                        </a>
                        <button type="button" class="delete-item text-xl md:px-2 transition-opacity" item-id=${embed.id}>
                            <svg class="w-5 h-5 md:w-6 md:h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.088 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"/></svg>
                        </button>
                    </div>
                `;
                contentDiv.appendChild(embedLi);
            });

            groupDiv.appendChild(titleButton);
            groupDiv.appendChild(contentDiv);
            embedsList.appendChild(groupDiv);
        });

        // Listen item click
        listenItemClick();

        // Liste group click
        listenGroupClick();

        // Listen delete item click
        listenDeleteItemClick();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', getEmbeds);