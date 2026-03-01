import { getInputValue, isPasswordMatch, validateAmount, showFeedbackModal, processTransaction } from "../helpers/helperFunction.js";

export function initTransfer(users, loggedUser) {
    const transferBtn = document.getElementById("transferMoneySubmitBtn");

    if (transferBtn) {
        transferBtn.addEventListener("click", function () {
            const userAccountNumber = getInputValue("userAccountNumberInput");
            const amount = parseFloat(getInputValue("amountToTransfer"));
            const password = getInputValue("passwordInputTransfer");

            if (!userAccountNumber) return showFeedbackModal('error', "Please enter recipient account number");
            if (!isPasswordMatch(password, loggedUser.userPassword)) return showFeedbackModal('error', "Password is not matched");
            if (!validateAmount(amount)) return showFeedbackModal('error', "Please enter a valid amount");
            if (amount > loggedUser.bankBalance) return showFeedbackModal('error', "Insufficient balance");

            processTransaction({
                users,
                loggedUser,
                type: "transfer",
                amount,
                inputIds: ["userAccountNumberInput", "amountToTransfer", "passwordInputTransfer"]
            });
        });
    }
}
