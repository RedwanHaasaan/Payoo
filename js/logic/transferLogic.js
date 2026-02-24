import { getInputValue, validatePin, validateAmount, showErrorAlert, processTransaction } from "../helpers/helperFunction.js";

export function initTransfer(users, loggedUser) {
    const transferBtn = document.getElementById("transferMoneySubmitBtn");

    if (transferBtn) {
        transferBtn.addEventListener("click", function () {
            const userAccountNumber = getInputValue("userAccountNumberInput");
            const amount = parseFloat(getInputValue("amountToTransfer"));
            const pin = getInputValue("pinNumberInputTransfer");

            if (!userAccountNumber) return showErrorAlert('transferMoneyErrorAlert', "Please enter recipient account number");
            if (!validatePin(pin)) return showErrorAlert('transferMoneyErrorAlert', "PIN must be at least 4 digits");
            if (!validateAmount(amount)) return showErrorAlert('transferMoneyErrorAlert', "Please enter a valid amount");
            if (amount > loggedUser.bankBalance) return showErrorAlert('transferMoneyErrorAlert', "Insufficient balance");

            processTransaction({
                users,
                loggedUser,
                type: "transfer",
                amount,
                inputIds: ["userAccountNumberInput", "amountToTransfer", "pinNumberInputTransfer"]
            });
        });
    }
}
