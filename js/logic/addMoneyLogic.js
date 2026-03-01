import { getInputValue, validatePin, validateAmount, showFeedbackModal, processTransaction } from "../helpers/helperFunction.js";

export function initAddMoney(users, loggedUser) {
    const addMoneyBtn = document.getElementById("addMoneyToAcBtn");

    if (addMoneyBtn) {
        addMoneyBtn.addEventListener("click", function () {
            const bank = getInputValue("bankToAdd");
            const accountNumber = getInputValue("accountNumberInput");
            const accountHolderName = getInputValue("accountHolderNameInput");
            const amount = parseFloat(getInputValue("addAmountInput"));
            const pin = getInputValue("pinNumberInputAdd");

            if (!bank) return showFeedbackModal('error', "Please select a bank");
            if (!accountNumber) return showFeedbackModal('error', "Please enter account number");
            if (!accountHolderName) return showFeedbackModal('error', "Please enter account holder name");
            if (!validatePin(pin)) return showFeedbackModal('error', "PIN must be at least 4 digits");
            if (!validateAmount(amount)) return showFeedbackModal('error', "Please enter a valid amount");

            processTransaction({
                users,
                loggedUser,
                type: "deposit",
                amount,
                inputIds: ["bankToAdd", "accountNumberInput", "accountHolderNameInput", "addAmountInput", "pinNumberInputAdd"]
            });
        });
    }
}
