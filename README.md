# Payoo — Mobile Banking App

A front-end mobile banking web application with login, registration, balance management, and transaction features. Built with vanilla JavaScript, Tailwind CSS, and DaisyUI. Data is persisted in the browser using `localStorage`.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Documentation](#documentation)
- [Validation & Business Rules](#validation--business-rules)

---

## Overview

**Payoo** is a single-page-style multi-page app that simulates a mobile banking experience. Users can register with a bank and mobile number, log in, and then add money, cash out, transfer money, claim bonus coupons, and pay bills. All state is stored in `localStorage`; there is no backend server.

The UI is responsive, mobile-first (max-width constrained), and uses a consistent design system with Tailwind and DaisyUI. Routing is file-based (`index.html`, `pages/registration.html`, `pages/home.html`) with redirects that work on both local file serving and GitHub Pages (including project and user sites).

---

## Features

| Feature | Description |
|--------|-------------|
| **Authentication** | Login with mobile number and password; register with bank, name, mobile, email, DOB, and password. |
| **Dashboard** | View available balance (৳), user name, and quick actions for all services. |
| **Add Money** | Select bank, enter account details and amount; confirm with password. Balance and transaction history updated. |
| **Cashout** | Enter agent number, amount, and password. Validates balance before withdrawal. |
| **Transfer Money** | Send money to another user by account number; amount and password required. |
| **Get Bonus** | Redeem coupon codes (e.g. `BONUS100`, `BONUS250`, `BONUS500`, `WELCOME50`) to credit bonus to balance. |
| **Pay Bill** | Pay bills (Electricity, Gas, Internet, Education Fee) with biller account number, amount, and password. |
| **Transactions** | List of recent transactions with type, amount, date, and time. |
| **Logout** | Clear session and redirect to login. |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Markup** | HTML5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 (browser build), [DaisyUI](https://daisyui.com/) v5, custom CSS |
| **Font** | [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) |
| **Icons** | [Font Awesome](https://fontawesome.com/) 7.x |
| **Script** | Vanilla JavaScript (ES modules) |
| **Data** | `localStorage` (no backend) |
| **Deployment** | Static hosting (e.g. GitHub Pages) |

---

## Project Structure

```
Practice Project-3[HTML,Tailwind,Daisy.JS]/
├── index.html                 # Login page (entry)
├── pages/
│   ├── registration.html      # User registration
│   └── home.html              # Dashboard + Add Money, Cashout, Transfer, Bonus, Pay Bill, Transactions
├── js/
│   ├── auth/
│   │   ├── login.js           # Login form handling & redirect
│   │   └── registration.js   # Registration form & validation
│   ├── logic/
│   │   ├── pageInitLogic.js  # Load user data, redirect if not logged in
│   │   ├── navigationLogic.js # Section tabs + logout
│   │   ├── addMoneyLogic.js   # Add money flow
│   │   ├── cashoutLogic.js    # Cashout flow
│   │   ├── transferLogic.js   # Transfer flow
│   │   ├── bonusLogic.js      # Bonus coupon flow
│   │   └── billPaymentLogic.js # Pay bill flow
│   ├── helpers/
│   │   ├── helperFunction.js  # Validation, UI helpers, transaction helpers
│   │   └── storeArray.js      # localStorage read/write for users
│   └── homePage.js            # Entry for home: loads users, inits all features
├── styles/
│   └── style.css              # Tailwind import, custom utilities (e.g. bg-customprimary)
├── assets/                    # Images (logo, Logo-full, opt-1..opt-6, etc.)
└── README.md
```

---

## Getting Started

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge).
- A local static server (e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), or Python `python -m http.server`) so that ES modules and paths work correctly. Opening `index.html` directly from the file system may cause module or path issues.

### Run locally

1. Clone or download the project.
2. Serve the project root with a static server (e.g. port 5500 for Live Server).
3. Open the URL (e.g. `http://127.0.0.1:5500/` or `http://localhost:5500/`).
4. Register a new account, then log in with the same mobile number and password.

---

## Deployment (GitHub Pages)

The app uses a **base URL helper** (`getSiteBaseUrl()` in `helperFunction.js`) so that redirects work on:

- **User/org site:** `https://<username>.github.io/`
- **Project site:** `https://<username>.github.io/<repo-name>/`

All navigation (login → home, logout → index, registration → index, unauthenticated → index) is built from this base. Deploy by enabling GitHub Pages for the repository (e.g. branch `main`, folder `/ (root)`). Ensure you open the site using the correct URL (including repo name for project sites).

---

## Documentation

### Pages and entry scripts

| Page | Entry script | Purpose |
|------|----------------|--------|
| `index.html` | `js/auth/login.js` | Login form; redirects to `pages/home.html` on success. |
| `pages/registration.html` | `js/auth/registration.js` | Registration form; redirects to `index.html` on success. |
| `pages/home.html` | `js/homePage.js` | Loads user from `localStorage`, inits UI and all transaction features. |

### Data model

- **Users** are stored in `localStorage` under the key `"users"` as a JSON array. Each user has: `uniqueId`, `userbankName`, `bankAccountNumber`, `userName`, `userMobile`, `userEmail`, `userDob`, `userPassword`, `bankBalance`, `transactionHistory`, `createdAt`.
- **Session:** The logged-in user’s mobile number is stored in `localStorage` as `"loggedUserMobile"`. The app finds the user object from `users` by matching `userMobile`.

### Main modules

| Module | Role |
|--------|------|
| `helperFunction.js` | Validation (mobile, email, password strength, amount, password match), `getSiteBaseUrl`, form helpers (`getInputValue`, `setValue`, `showErrorMessage`), feedback modal, user creation, transaction display and processing. |
| `storeArray.js` | `getUserData(key)`, `storeUserData(key, newUser)` for reading/updating the users array in `localStorage`. |
| `pageInitLogic.js` | Ensures a user is logged in; otherwise redirects to index. Fills user name, balance, and transaction list. |
| `navigationLogic.js` | Section switching (Add Money, Cashout, etc.) and logout redirect. |
| Transaction logic files | Each handles one flow: form read, validation (amount, password match), balance checks where needed, then `processTransaction` or equivalent and feedback modal. |

### Flow summary

1. **Login:** Validate mobile and password, set `loggedUserMobile`, redirect to `getSiteBaseUrl() + "pages/home.html"`.
2. **Home load:** Read `users` and `loggedUserMobile`, find `loggedUser`. If none, redirect to index. Otherwise render balance, name, and transactions, and init all action handlers.
3. **Transactions:** User enters data and password; logic validates, updates `loggedUser.bankBalance` and `transactionHistory`, writes `users` back to `localStorage`, updates DOM and shows success/error modal.

---

## Validation & Business Rules

- **Mobile number:** Bangladeshi format (e.g. `01XXXXXXXXX`, optional `+880`/`880` prefix); validated with regex in `validateMobileNumber`.
- **Password (registration):** Min 8 characters; at least one lowercase, one uppercase, one number, one special character; no spaces. Validated via `validatePassword` in `helperFunction.js`.
- **Password (transactions):** Must match the logged-in user’s password and be at least 4 characters; checked with `isPasswordMatch`.
- **Amounts:** Positive numbers; validated with `validateAmount`. Cashout, transfer, and pay bill check balance before debiting.
- **Bank/registration:** User must select a bank (placeholder option “Select A Bank” is rejected in registration).
- **Bonus coupons:** Predefined codes (e.g. `BONUS100`, `BONUS250`, `BONUS500`, `WELCOME50`) mapped to fixed amounts; invalid code shows error.

---

## License

This project is for educational use (e.g. Programming Hero course). Use and modify as needed for learning purposes.
