import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import app from './realmApp';
import { Credentials } from 'realm-web';
import { signOut, signUp } from './auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    if (app.currentUser) {
      setUser(app.currentUser);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await app.logIn(Credentials.emailPassword(email, password)); // Use email/password credentials
      setUser(user);
      setError(""); // Clear error if sign in is successful
    } catch (err) {
      console.error("Failed to log in", err);
      setError("Failed to log in. Please check your email and password."); // Set error message
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleSignUp = async (email, password) => {
    try {
      await signUp(email, password);
      alert("User signed up successfully!");
    } catch (err) {
      console.error("Failed to sign up", err);
    }
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          {/* <Route path='/services' Component={Services} /> */}
          {/* <Route path='/sign-in' Component={SignIn} /> */}
          {/* <Route path='/sign-up' Component={SignUp} /> */}
        </Routes>
      </Router>
      <h1>Welcome to Land Holdings App</h1>

      {user ? (
        <>
          <p>Welcome, {user.profile.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <SignInComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSignIn={handleSignIn}
            error={error} // Pass error message
          />
          <SignUpComponent onSignUp={handleSignUp} />
        </>
      )}
    </div>
  );
};

const SignInComponent = ({ email, setEmail, password, setPassword, handleSignIn, error }) => {
  return (
    <div>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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

const SignUpComponent = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <button onClick={() => onSignUp(email, password)}>Sign Up</button>
    </div>
  );
};

export default App;

