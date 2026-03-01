// ===== VALIDATION FUNCTIONS =====
export function validateMobileNumber(mobileNumber) {
    const numberInput = mobileNumber.trim();
    const mobileNumberPattern = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
    return mobileNumberPattern.test(numberInput);
}

export function validateEmail(email) {
    const emailInput = email.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailInput);
}

export function validatePassword(password) {
    const passwordInput = password.trim();
    const errors = [];

    if (passwordInput.length < 8) errors.push("Password must be at least 8 characters long.");
    if (!/[a-z]/.test(passwordInput)) errors.push("Password must contain at least one lowercase letter.");
    if (!/[A-Z]/.test(passwordInput)) errors.push("Password must contain at least one uppercase letter.");
    if (!/\d/.test(passwordInput)) errors.push("Password must contain at least one number.");
    if (!/[^A-Za-z\d]/.test(passwordInput)) errors.push("Password must contain at least one special character.");
    if (/\s/.test(passwordInput)) errors.push("Password must not contain spaces.");

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export function validatePin(pin) { 
    return pin && pin.length >= 4;
}

export function validateAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
}

// ===== SITE BASE URL  =====
export function getSiteBaseUrl() {
    const pathname = typeof location !== "undefined" ? location.pathname : "";
    const origin = typeof location !== "undefined" ? location.origin : "";
    // Site root is the path before "/pages/" (e.g. "" or "/RepoName"), or the current directory if not in /pages/
    const pagesIndex = pathname.indexOf("/pages/");
    const basePath = pagesIndex >= 0 ? pathname.slice(0, pagesIndex) : pathname.replace(/\/[^/]*$/, "") || "";
    return origin + (basePath ? basePath + "/" : "/");
}

// ===== INPUT/OUTPUT FUNCTIONS =====
export function getInputValue(inputID) {
    const inputElement = document.getElementById(inputID);
    return inputElement ? inputElement.value.trim() : "";
}

export function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.innerText = value;
}

export function showErrorMessage(message) {
    const errorAlert = document.getElementById('errorAlert');
    if (errorAlert) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('hidden');
        setTimeout(() => errorAlert.classList.add('hidden'), 3000);
    }
}
// ===== FEEDBACK MODAL FUNCTIONS =====
export function showFeedbackModal(type, message) {
    const modal = document.getElementById('feedback_modal');
    const icon = document.getElementById('feedback_icon');
    const title = document.getElementById('feedback_title');
    const messageBox = document.getElementById('feedback_message');
    const button = document.getElementById('feedback_button');
    const accentBar = document.getElementById('feedback_accent_bar');

    if (!modal) return;

    messageBox.textContent = message;

    if (type === "success") {
        icon.className = "w-24 h-24 rounded-full flex items-center justify-center bg-success text-white text-5xl shadow-lg transition-all duration-300";
        icon.innerHTML = "✓";
        title.textContent = "Success";
        title.className = "text-2xl font-semibold tracking-tight mb-3 text-success";
        button.className = "btn btn-success btn-wide rounded-full px-8 text-white";
        accentBar.className = "h-1 w-full bg-success";
    } else {
        icon.className = "w-24 h-24 rounded-full flex items-center justify-center bg-error text-white text-5xl shadow-lg transition-all duration-300";
        icon.innerHTML = "✕";
        title.textContent = "Something went wrong";
        title.className = "text-2xl font-semibold tracking-tight mb-3 text-error";
        button.className = "btn btn-error btn-wide rounded-full px-8 text-white";
        accentBar.className = "h-1 w-full bg-error";
    }

    modal.showModal();
}

export function closeFeedbackModal() {
    document.getElementById('feedback_modal')?.close();
}

export function clearFormInputs(inputIds) {
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });
}

// ===== USER MANAGEMENT =====
export function createUser(bankName, name, mobile, email, dob, password) {
    return {
        uniqueId: Date.now(),
        userbankName: bankName,
        bankAccountNumber: 'PY-' + Math.floor(1000000000 + Math.random() * 9000000000),
        userName: name,
        userMobile: mobile,
        userEmail: email,
        userDob: dob,
        userPassword: password,
        bankBalance: 0.00,
        transactionHistory: [],
        createdAt: new Date().toISOString()
    };
}

export function findByField(data, field, value) {
    return Array.isArray(data) ? data.find(item => item[field] === value) || null : null;
}

// ===== TRANSACTION FUNCTIONS =====
export function addTransaction(user, type, amount) {
    user.transactionHistory = user.transactionHistory || [];
    user.transactionHistory.push({
        type: type,
        amount: amount,
        date: new Date().toISOString()
    });
}

export function processTransaction(config) {
    const { users, loggedUser, type, amount, inputIds } = config;
    
    const newBalance = type === 'deposit' || type === 'bonus' 
        ? loggedUser.bankBalance + amount 
        : loggedUser.bankBalance - amount;

    loggedUser.bankBalance = newBalance;
    addTransaction(loggedUser, type, amount);
    localStorage.setItem("users", JSON.stringify(users));
    setValue("bankBalance", newBalance);
    clearFormInputs(inputIds);
    refreshTransactionDisplay(loggedUser);
    
    const action = isMoneyIn(type) ? "received" : "transferred";
    showFeedbackModal("success", `Successfully ${action} ৳${amount}. New balance: ৳${newBalance}`);
}

export function getTransactionLabel(type) {
    const labels = {
        "deposit": "Money Added",
        "withdrawal": "Money Withdrawn",
        "transfer": "Money Transferred",
        "bonus": "Bonus Received",
        "bill_payment": "Bill Payment"
    };
    return labels[type] || "Transaction";
}

export function isMoneyIn(type) {
    return type === "deposit" || type === "bonus";
}

export function formatTransactionDateTime(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return { formattedDate, formattedTime };
}

export function refreshTransactionDisplay(loggedUser) {
    const transactionContainer = document.getElementById("transactionsList");
    const noTransactionsMessage = document.getElementById("noTransactionsMessage");
    
    if (!transactionContainer || !noTransactionsMessage) return;
    
    transactionContainer.querySelectorAll(".transaction-item").forEach((el) => el.remove());
    
    const transactionHistory = loggedUser ? loggedUser.transactionHistory : [];
    
    if (transactionHistory.length > 0) {
        noTransactionsMessage.classList.add("hidden");
        
        transactionHistory.forEach((transaction) => {
            const transactionElement = document.createElement("div");
            transactionElement.className = "transaction-item bg-white rounded-2xl shadow-md px-4 py-3 flex items-center justify-between hover:shadow-lg transition-all duration-200 cursor-pointer";
            
            const { formattedDate, formattedTime } = formatTransactionDateTime(transaction.date);
            
            transactionElement.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="bg-gray-200 p-3 rounded-full flex items-center justify-center">
                        <img src="../assets/opt-1.png" alt="Transaction Icon" class="w-5 h-5">
                    </div>
                    <div>
                        <h2 class="text-gray-800 font-semibold text-sm">${getTransactionLabel(transaction.type)}</h2>
                        <p class="text-gray-600 text-xs mt-1">${formattedDate} • ${formattedTime}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-semibold text-sm ${isMoneyIn(transaction.type) ? "text-green-600" : "text-red-600"}">
                        ${isMoneyIn(transaction.type) ? "+" : "-"}৳${transaction.amount}
                    </span>
                    <button class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
            `;
            
            transactionContainer.prepend(transactionElement);
        });
    } else {
        noTransactionsMessage.classList.remove("hidden");
    }
}
