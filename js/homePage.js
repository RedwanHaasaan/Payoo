// Import all logic modules
import { initPageUI } from "./logic/pageInitLogic.js";
import { initNavigation, initLogout } from "./logic/navigationLogic.js";
import { initAddMoney } from "./logic/addMoneyLogic.js";
import { initCashout } from "./logic/cashoutLogic.js";
import { initTransfer } from "./logic/transferLogic.js";
import { initBonus } from "./logic/bonusLogic.js";
import { initBillPayment } from "./logic/billPaymentLogic.js";
import { getUserData } from "./helpers/storeArray.js";

// Get user data
const users = getUserData("users") || [];
const loggedUserMobile = localStorage.getItem("loggedUserMobile");
const loggedUser = users.find((user) => user.userMobile === loggedUserMobile);

// Initialize Page UI
initPageUI(loggedUser);

// Initialize Navigation
initNavigation();
initLogout();

// Initialize All Transaction Features
initAddMoney(users, loggedUser);
initCashout(users, loggedUser);
initTransfer(users, loggedUser);
initBonus(users, loggedUser);
initBillPayment(users, loggedUser);
