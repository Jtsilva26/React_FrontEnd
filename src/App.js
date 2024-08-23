import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
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
      <Router>
        <Navbar />
        <Routes>
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

export default App;

