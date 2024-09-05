import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //Importing React Router components for navigation
import { AuthProvider } from './AuthContext'; //
import Home from "./components/pages/Home";
import SignIn from './components/pages/SignIn';
import Navbar from './components/Navbar';
import Services from './components/pages/Services';
import OwnersPage from './components/pages/OwnersPage';
import HoldersPage from './components/pages/HoldersPage';
import './App.css';

const App = () => {

  return (
    <AuthProvider> {/* Ensure this wraps your Router */}
      <Router> {/* Main router component for client-side routing */}
        <Navbar /> {/* Display Navbar */}
        <Routes> {/* Container for all routes */}
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/services' element={<Services />} />
          <Route path='/owners' element={<OwnersPage />} />
          <Route path="/land-holding" element={<HoldersPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; //Exporting the App components for use in index.js

