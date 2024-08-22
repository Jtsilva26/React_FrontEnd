import React, { useState } from 'react';
import app from '../../realmApp';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
            alert("Sign-up successful, Please sign in.");
        } catch (err) {
            console.error("Failed to register".err);
        }
    };


    return (
        <div>
            <h2>Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};


export default SignUp;