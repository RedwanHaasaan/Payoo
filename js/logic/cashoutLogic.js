import { getInputValue, validatePin, validateAmount, showErrorAlert, processTransaction } from "../helpers/helperFunction.js";

export function initCashout(users, loggedUser) {
    const cashOutBtn = document.getElementById("cashOutSubmitBtn");

    if (cashOutBtn) {
        cashOutBtn.addEventListener("click", function () {
            const agentNumber = getInputValue("agentNumberInput");
            const amount = parseFloat(getInputValue("amountToCashout"));
            const pin = getInputValue("pinNumberInputCashout");

            if (!agentNumber) return showErrorAlert('cashOutErrorAlert', "Please enter agent number");
            if (!validatePin(pin)) return showErrorAlert('cashOutErrorAlert', "PIN must be at least 4 digits");
            if (!validateAmount(amount)) return showErrorAlert('cashOutErrorAlert', "Please enter a valid amount");
            if (amount > loggedUser.bankBalance) return showErrorAlert('cashOutErrorAlert', "Insufficient balance");

            processTransaction({
                users,
                loggedUser,
                type: "withdrawal",
                amount,
                inputIds: ["agentNumberInput", "amountToCashout", "pinNumberInputCashout"]
            });
        });
    }
}
