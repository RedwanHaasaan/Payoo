export function storeUserData(key, newUser) {
    const existingUsers = getUserData(key) || []; 

    existingUsers.push(newUser); 

    localStorage.setItem(key, JSON.stringify(existingUsers));
}

export function getUserData(key) {
    const userDataString = localStorage.getItem(key);
    return userDataString ? JSON.parse(userDataString) : null;
}
