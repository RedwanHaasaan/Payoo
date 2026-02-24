import { setValue, refreshTransactionDisplay } from "../helpers/helperFunction.js";

export function initPageUI(loggedUser) {
    // Check if user is logged in
    if (!loggedUser) {
        window.location.href = "../index.html";
        return;
    }

    // Set user name
    if (loggedUser) {
        setValue("userName", loggedUser.userName);
    }

    // Set user bank balance - Fixed: show 0 if balance is 0
    const bankBalance = loggedUser ? loggedUser.bankBalance : 0;
    if (bankBalance !== null && bankBalance !== undefined) {
        setValue("bankBalance", bankBalance);
    }

    // Display transactions on page load
    refreshTransactionDisplay(loggedUser);
}
