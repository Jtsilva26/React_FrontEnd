import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    return (
        <div className="services-container">
            <Link to="/owners" className="service-block">
                <h2>Owners</h2>
                <p>Create and manage owners</p>
            </Link>
            <Link to="/land-holding" className="service-block">
                <h2>Land Holders</h2>
                <p>Create and manage land holdings</p>
            </Link>
        </div>
    );
};

export default Services;
