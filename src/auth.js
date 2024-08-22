import app from "./realmApp";
import { Credentials } from "realm-web";

// Sign up a new user
export const signUp = async (email, password) => {
    try {
        await app.emailPasswordAuth.registerUser({ email, password });
        alert("Sign-up successful! Please sign in.");
    } catch (err) {
        console.error("Failed to register", err);
        // Returning a more user-friendly error message
        throw new Error("Sign-up failed. Please check your input and try again.");
    }
};

// Sign in an existing user
export const signIn = async (email, password) => {
    try {
        const credentials = Credentials.emailPassword(email, password);
        const user = await app.logIn(credentials);
        return user; // Return the logged-in user
    } catch (err) {
        console.error("Failed to log in", err);
        // Returning a more user-friendly error message
        throw new Error("Sign-in failed. Please check your email and password.");
    }
};

// Log out the current user
export const signOut = async () => {
    try {
        await app.currentUser?.logOut();
        return true; // Indicate successful logout
    } catch (err) {
        console.error("Failed to log out", err);
        // Returning a more user-friendly error message
        throw new Error("Log out failed. Please try again.");
    }
};
