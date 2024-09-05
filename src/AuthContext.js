// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import app from './realmApp';
import { signIn, signOut, signUp as registerUser } from './auth'; // Importing signUp as registerUser for clarity

//Create an authentication context to manage user authentication state
const AuthContext = createContext();

//AuthProvider component that wraps around the app to provide authentication context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //State to hold authenticated user's info; null if no user is logged in

    //useEffect hook to check the current user on component mount
    useEffect(() => {
        const currentUser = app.currentUser; //Get the current user from the Realm app
        if (currentUser) { //Check for logged in user
            setUser(currentUser); //Update state with the logged-in user info
        }
    }, []); //Empty dependency array means this runs only once when the component mounts

    //Function to handle user sign-in
    const handleSignIn = async (email, password) => {
        const user = await signIn(email, password); //Attempt to sign in with provided credentials
        setUser(user); //Update user state with the authenticated user object
    };

    //Function to handle user sign-out
    const handleSignOut = async () => {
        await signOut(); //Calls signOut function to log out the user
        setUser(null); //Sets user state to null after sign-out
    };

    //Function to handle user registration
    const signUp = async (email, password) => {
        return await registerUser(email, password); //Register a new user and return the user object
    };

    //Provide the authentication context to all child components
    return (
        <AuthContext.Provider value={{ user, handleSignIn, handleSignOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

//Custom hook for easy access to the authentication context in other components
//Instead of calling it manually in each component
export const useAuth = () => {
    return useContext(AuthContext); //Returns the current value of the AuthContext
};
