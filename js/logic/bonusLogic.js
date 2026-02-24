import { getInputValue, showErrorAlert, addTransaction, setValue, clearFormInputs, refreshTransactionDisplay } from "../helpers/helperFunction.js";

export function initBonus(users, loggedUser) {
    const couponBtn = document.getElementById("couponSubmitBtn");

    if (couponBtn) {
        couponBtn.addEventListener("click", function () {
            const coupon = getInputValue("couponInput");
            const coupons = { "BONUS100": 100, "BONUS250": 250, "BONUS500": 500, "WELCOME50": 50 };
            const bonusAmount = coupons[coupon.toUpperCase()];

            if (!coupon) return showErrorAlert('bonusErrorAlert', "Please enter a coupon code");
            if (!bonusAmount) return showErrorAlert('bonusErrorAlert', "Invalid coupon code");

            loggedUser.bankBalance += bonusAmount;
            addTransaction(loggedUser, "bonus", bonusAmount);
            localStorage.setItem("users", JSON.stringify(users));
            setValue("bankBalance", loggedUser.bankBalance);
            clearFormInputs(["couponInput"]);
            refreshTransactionDisplay(loggedUser);
            alert(`Congratulations! You received ৳${bonusAmount} bonus. New balance: ৳${loggedUser.bankBalance}`);
        });
    }
}
