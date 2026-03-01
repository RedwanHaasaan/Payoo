import { getInputValue, validatePin, validateAmount, showFeedbackModal, processTransaction } from "../helpers/helperFunction.js";

export function initBillPayment(users, loggedUser) {
    const payBillBtn = document.getElementById("payBillSubmitBtn");

    if (payBillBtn) {
        payBillBtn.addEventListener("click", function () {
            const organization = getInputValue("paySelect");
            const billerAccountNumber = getInputValue("billerAccountNumberInput");
            const amount = parseFloat(getInputValue("amountToPayInput"));
            const pin = getInputValue("pinNumberInputPayBill");

            if (!organization || organization === "Select Organization") return showFeedbackModal('error', "Please select an organization");
            if (!billerAccountNumber) return showFeedbackModal('error', "Please enter biller account number");
            if (!validatePin(pin)) return showFeedbackModal('error', "PIN must be at least 4 digits");
            if (!validateAmount(amount)) return showFeedbackModal('error', "Please enter a valid amount");
            if (amount > loggedUser.bankBalance) return showFeedbackModal('error', "Insufficient balance");

            processTransaction({
                users,
                loggedUser,
                type: "bill_payment",
                amount,
                inputIds: ["paySelect", "billerAccountNumberInput", "amountToPayInput", "pinNumberInputPayBill"]
            });
        });
    }
}
