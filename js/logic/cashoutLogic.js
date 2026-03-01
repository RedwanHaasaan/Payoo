import { getInputValue, validatePin, validateAmount, showFeedbackModal, processTransaction } from "../helpers/helperFunction.js";

export function initCashout(users, loggedUser) {
    const cashOutBtn = document.getElementById("cashOutSubmitBtn");

    if (cashOutBtn) {
        cashOutBtn.addEventListener("click", function () {
            const agentNumber = getInputValue("agentNumberInput");
            const amount = parseFloat(getInputValue("amountToCashout"));
            const pin = getInputValue("pinNumberInputCashout");

            if (!agentNumber) return showFeedbackModal('error', "Please enter agent number");
            if (!validatePin(pin)) return showFeedbackModal('error', "PIN must be at least 4 digits");
            if (!validateAmount(amount)) return showFeedbackModal('error', "Please enter a valid amount");
            if (amount > loggedUser.bankBalance) return showFeedbackModal('error', "Insufficient balance");

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
