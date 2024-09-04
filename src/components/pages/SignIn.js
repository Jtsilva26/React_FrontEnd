import React, { useState } from 'react';
import { Button } from '../Button';
import { useAuth } from '../../AuthContext';
import './SignIn.css';

const SignIn = () => {
    const { user, handleSignIn, signUp, handleSignOut } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (isSignUp) {
            try {
                await signUp(email, password);
                await handleSignIn(email, password); // Automatically sign in the user after sign-up
                setMessage("Sign-up and login successful!");
                setEmail("");
                setPassword("");
            } catch (err) {
                setError("Failed to sign up, please use a password six characters long.");
            }
        } else {
            // Handle sign in
            try {
                await handleSignIn(email, password);
                setMessage("Logged in successfully!");
                setEmail("");
                setPassword("");
            } catch (err) {
                setError("Failed to log in. Please check your email and password.");
            }
        }
    };

    const handleSignOutClick = async () => {
        await handleSignOut();
        setMessage("Logged out successfully!");
    };

    if (user) {
        return (
            <div>
                <h2>Welcome!</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <h2>
                    <Button buttonStyle='btn--primary' buttonSize='btn--medium' onClick={handleSignOutClick}>Sign Out</Button>
                </h2>
            </div>
        );
    }

    return (
        <div className="sign-in-container">
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
            <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', color: 'blue' }}>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
};

export default SignIn;
