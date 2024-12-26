export const preventMinutes = () => {
    const dateTimeInput = document.getElementById("dateTimeInput");

    // Prevenir entrada manual de minutos diferentes a "00"
    dateTimeInput.addEventListener("input", () => {
        const date = moment(dateTimeInput.value);
        console.log(date);

        // Verificar si la fecha es válida
        if (date.isValid()) {
            const adjustedDate = date.minute(0).second(0);
            dateTimeInput.value = adjustedDate.format("YYYY-MM-DDTHH:mm");
            console.log(adjustedDate.format("YYYY-MM-DDTHH:mm"));
            console.log(dateTimeInput.value);
        } else {
            console.error("Fecha/hora no válida");
        }
    });
}