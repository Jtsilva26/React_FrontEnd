import app from "./realmApp";
import { Credentials } from "realm-web"; //Helper object to manage user credentials

// Sign up a new user with email and password
export const signUp = async (email, password) => {
    try {
        //Register the new user using MongoDB Realm's email/password authentication
        await app.emailPasswordAuth.registerUser({ email, password });
        alert("Sign-up successful! Please sign in.");
    } catch (err) {
        console.error("Failed to register", err); //Log the error for debugging
        throw new Error("Sign-up failed. Please check your input and try again.");
    }
};

// Sign in an existing user using email and password
export const signIn = async (email, password) => {
    try {
        //Create credentials object for user login
        const credentials = Credentials.emailPassword(email, password);
        //Login with credentials
        const user = await app.logIn(credentials);
        return user; // Return the logged-in user
    } catch (err) {
        console.error("Failed to log in", err); //Log the error for debugging
        throw new Error("Sign-in failed. Please check your email and password.");
    }
};

// Log out the current user
export const signOut = async () => {
    try {
        await app.currentUser?.logOut();
        return true; // Indicate successful logout
    } catch (err) {
        console.error("Failed to log out", err); //Log the error for debugging
        throw new Error("Log out failed. Please try again.");
    }
};
