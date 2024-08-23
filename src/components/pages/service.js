// src/components/pages/Services.js
import React from 'react';
import LandHoldingList from '../LandHoldingList';
import CreateLandHolding from '../CreateLandHolding';
import CreateOwner from '../Owners';
import { useAuth } from '../../AuthContext'; // Import auth context
import OwnersList from '../OwnersList';

const Services = () => {
    const { user } = useAuth(); // Access user from auth context

    return (
        <div>
            <h1>Services</h1>
            <OwnersList user={user} />
            <CreateOwner user={user} />
            <LandHoldingList user={user} />
            <CreateLandHolding user={user} />
        </div>
    );
};

export default Services;
