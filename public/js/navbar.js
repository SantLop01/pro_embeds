// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const hideSidebar = document.getElementById("hide-sidebar");
const logoWrap = document.getElementById("logoWrap");
const headerText = document.getElementById("headerText");
const headerNav = document.getElementById("headerNav");
const headerNav2 = document.getElementById("headerNav2");

// Check if is mobile
const isDesktop = window.innerWidth >= 1024;

hideSidebar.addEventListener("click", () => {
    // Toogles Actions
    if (isDesktop) {
        hideSidebar.classList.toggle("rotate-360");
        logoWrap.classList.toggle("justify-center");
        sidebar.classList.toggle("min-w-fit");
        headerText.classList.toggle("hidden");
        headerNav.classList.toggle("lg:block");
        headerNav2.classList.toggle("lg:hidden");

        const iconsSidebar = localStorage.getItem("iconsSidebar");
        if (iconsSidebar === "true") {
            localStorage.setItem("iconsSidebar", false);
        } else {
            localStorage.setItem("iconsSidebar", true);
        }
    }
});


// Check if sidebar is hidden
document.addEventListener("DOMContentLoaded", () => {
    const iconsSidebar = localStorage.getItem("iconsSidebar");
    if (iconsSidebar === "true" && isDesktop) {
        hideSidebar.classList.toggle("rotate-360");
        logoWrap.classList.toggle("justify-center");
        sidebar.classList.toggle("min-w-fit");
        headerText.classList.toggle("hidden");
        headerNav.classList.toggle("lg:block");
        headerNav2.classList.toggle("lg:hidden");
    }   
});