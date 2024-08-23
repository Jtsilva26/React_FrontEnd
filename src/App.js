import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import app from './realmApp';
import Home from "./components/pages/Home";
import SignIn from './components/pages/SignIn';
import Navbar from './components/Navbar';
import Services from './components/pages/service';
import './App.css';

const App = () => {

  return (
    <AuthProvider> {/* Ensure this wraps your Router */}
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/services' element={<Services />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

