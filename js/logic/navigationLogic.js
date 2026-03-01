import { getSiteBaseUrl } from "../helpers/helperFunction.js";

export function initNavigation() {
    const buttons = document.querySelectorAll(".heroBtn");
    const menus = document.querySelectorAll(".menu-lg");
    
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active style from all buttons
            buttons.forEach((b) => {
                b.classList.remove("bg-primary", "text-white");
                b.querySelector("p")?.classList.add("text-gray-600");
            });

            // Add active style to clicked button
            this.classList.add("bg-primary", "text-white");
            this.querySelector("p")?.classList.remove("text-gray-600");

            // Hide all menus
            menus.forEach((menu) => menu.classList.add("hidden"));

            // Get target using dataset (cleaner way)
            const targetId = this.dataset.target;
            const targetMenu = document.getElementById(targetId);

            if (targetMenu) {
                targetMenu.classList.remove("hidden");
            }
        });
    });
}

export function initLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedUserMobile");
            window.location.href = getSiteBaseUrl() + "index.html";
        });
    }
}
