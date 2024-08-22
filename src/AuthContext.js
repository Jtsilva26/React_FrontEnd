// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import app from './realmApp';
import { signIn, signOut, signUp as registerUser } from './auth'; // Import signUp as registerUser

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = app.currentUser;
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleSignIn = async (email, password) => {
        const user = await signIn(email, password);
        setUser(user);
    };

    const handleSignOut = async () => {
        await signOut();
        setUser(null);
    };

    const signUp = async (email, password) => {
        return await registerUser(email, password); // Use the imported signUp function
    };

    return (
        <AuthContext.Provider value={{ user, handleSignIn, handleSignOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
