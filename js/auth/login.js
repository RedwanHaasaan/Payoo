import { validateMobileNumber, getInputValue, showErrorMessage, findByField, getSiteBaseUrl } from "../helpers/helperFunction.js";
import { getUserData } from "../helpers/storeArray.js";

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        const userData = getUserData("users") || [];
        const mobileNumber = getInputValue("numberInput");
        const password = getInputValue("passwordInput");

        if (!validateMobileNumber(mobileNumber)) return showErrorMessage("Please enter a valid mobile number");
        
        const user = findByField(userData, "userMobile", mobileNumber);
        if (!user) return showErrorMessage("User not found. Please check your mobile number or register for a new account.");
        if (password !== user.userPassword) return showErrorMessage("Invalid mobile number or password. Please try again.");

        localStorage.setItem("loggedUserMobile", user.userMobile);
        window.location.href = getSiteBaseUrl() + "pages/home.html";
    });
}
