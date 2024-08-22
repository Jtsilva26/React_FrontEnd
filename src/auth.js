import app from "./realmApp";
import { Credentials } from "realm-web";

// Sign up a new user
export const signUp = async (email, password) => {
    try {
        await app.emailPasswordAuth.registerUser({ email, password });
        alert("Sign-up successful! Please sign in.");
    } catch (err) {
        console.error("Failed to register", err);
        throw err;
    }
};

// Sign in an existing user
export const signIn = async (email, password) => {
    try {
        const credentials = Credentials.emailPassword(email, password);
        const user = await app.logIn(credentials);
        return user;
    } catch (err) {
        console.error("Failed to log in", err);
        throw err;
    }
};

// Log out the current user
export const signOut = async () => {
    try {
        await app.currentUser?.logOut();
    } catch (err) {
        console.error("Failed to log out", err);
    }
};
