import React, { useState } from 'react';
import app from '../../realmApp';
import { Credentials } from 'realm-web';

const SignIn = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            const user = await app.logIn(Credentials.emailPassword(email, password));
            setUser(user);
        } catch (err) {
            console.error("Failed to log in", err);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
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
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignIn;
