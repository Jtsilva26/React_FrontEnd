import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../auth";
import { useAuth } from '../AuthContext';
import app from '../realmApp';
import './Navbar.css';

function Navbar() {
    const { user, handleSignOut } = useAuth(); // Use the auth context
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    useEffect(() => {
        const handleResize = () => showButton();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        PHOENIX CAPITAL GROUP <i className="navbar-logo" />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/services' className="nav-links" onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                    </ul>
                    {button && (
                        user ? (
                            <Button buttonStyle='btn--outline' onClick={handleSignOut}>
                                SIGN OUT
                            </Button>
                        ) : (
                            <Link to='/sign-in'>
                                <Button buttonStyle='btn--outline'>
                                    SIGN IN
                                </Button>
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;