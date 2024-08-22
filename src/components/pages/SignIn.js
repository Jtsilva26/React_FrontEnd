// src/components/pages/SignIn.js
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext'; // Import the authentication context
import './SignIn.css'; // Ensure you have styles if needed

const SignIn = () => {
    const { handleSignIn, signUp } = useAuth(); // Use the authentication context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); // State for success/error messages
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign in and sign up

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error messages

        if (isSignUp) {
            // Handle sign up
            try {
                await signUp(email, password);
                setMessage("Sign-up successful! You can now sign in.");
                setEmail(""); // Clear the input
                setPassword("");
            } catch (err) {
                setError("Failed to sign up. Please try again.");
            }
        } else {
            // Handle sign in
            try {
                await handleSignIn(email, password);
                setMessage("Logged in successfully!");
                setEmail(""); // Clear the input
                setPassword("");
            } catch (err) {
                setError("Failed to log in. Please check your email and password.");
            }
        }
    };

    return (
        <div>
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
