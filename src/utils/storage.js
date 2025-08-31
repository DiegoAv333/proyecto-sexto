// Encapsula localStorage
const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
export const setUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getCurrentUser = () => {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
};
export const setCurrentUser = (user) => localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
export const clearCurrentUser = () => localStorage.removeItem(CURRENT_KEY);

export const getEnrolled = (email) =>
    JSON.parse(localStorage.getItem(`enrolled_${email}`) || "[]");
export const setEnrolled = (email, subjects) =>
    localStorage.setItem(`enrolled_${email}`, JSON.stringify(subjects));
