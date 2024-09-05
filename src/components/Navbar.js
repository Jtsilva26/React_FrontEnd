import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext';

import './Navbar.css';

function Navbar() {
    const { user, handleSignOut } = useAuth(); //User Info and Sign out function from Auth context
    const [click, setClick] = useState(false); //State to manage mobile menu click
    const [button, setButton] = useState(true); //State to determine whether to show the button

    //Toggle mobile menu visibility
    const handleClick = () => setClick(!click);
    //Close mobile menu when a link is clicked
    const closeMobileMenu = () => setClick(false);

    //Show or hide the bnutton based on the window width
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false); //Hide button on mobile
        } else {
            setButton(true); //Show button on larger screen
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    //Add event listener to handle window resizing
    useEffect(() => {
        const handleResize = () => showButton(); //Check window size on resize
        window.addEventListener('resize', handleResize); //Add resize event listener
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
                        {user ? (
                            <li className="nav-item">
                                <Link to='/services' className="nav-links" onClick={closeMobileMenu}>
                                    Services
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <span className="nav-links disabled" onClick={closeMobileMenu}>
                                    Services (Sign in to access)
                                </span>
                            </li>
                        )}
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