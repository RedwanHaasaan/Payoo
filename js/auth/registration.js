import { validateMobileNumber, validateEmail, validatePassword, getInputValue, showErrorMessage, createUser, getSiteBaseUrl } from "../helpers/helperFunction.js";
import { storeUserData, getUserData } from "../helpers/storeArray.js";

const registerBtn = document.getElementById('registerBtn');

if (registerBtn) {
    registerBtn.addEventListener('click', function () {
        const userData = getUserData('users') || [];
        const bankName = getInputValue('bankSelect');
        const fullName = getInputValue('fullNameInput');
        const mobileNumber = getInputValue('registerNumberInput');
        const email = getInputValue('emailInput');
        const dob = getInputValue('dobInput');
        const password = getInputValue('passwordInput');
        const confirmPassword = getInputValue('confirmPasswordInput');

        if (!fullName || !mobileNumber || !email || !dob || !password || !confirmPassword) return showErrorMessage('Please fill in all fields.');
        if (bankName === 'Select Bank') return showErrorMessage('Please select a bank.');
        if (!validateMobileNumber(mobileNumber)) return showErrorMessage('Please enter a valid mobile number.');
        if (!validateEmail(email)) return showErrorMessage('Please enter a valid email address.');
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) return showErrorMessage(passwordValidation.errors[0]);
        if (password !== confirmPassword) return showErrorMessage('Passwords do not match. Please try again.');
        
        const userExists = userData.find(user => user.userMobile === mobileNumber || user.userEmail === email);
        if (userExists) return showErrorMessage('User already exists. Please use different credentials or log in.');

        const newUser = createUser(bankName, fullName, mobileNumber, email, dob, password);
        storeUserData('users', newUser);
        alert('Registration successful! Please log in with your credentials.');
        window.location.href = getSiteBaseUrl() + "index.html";
    });
}
