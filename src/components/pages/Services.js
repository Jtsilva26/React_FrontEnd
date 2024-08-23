import React, { useState, useEffect } from 'react';
import LandHoldingList from '../LandHoldingList';
import CreateLandHolding from '../CreateLandHolding';
import CreateOwner from '../Owners';
import OwnersList from '../OwnersList';
import app from '../../realmApp';
import './Services.css';

const Services = () => {
    const [owners, setOwners] = useState([]);
    const [landHoldings, setLandHoldings] = useState([]);

    const fetchData = async () => {
        try {
            const ownersData = await app.currentUser.callFunction("getOwners");
            setOwners(ownersData);
            const landHoldingsData = await app.currentUser.callFunction("getLandHoldings");
            setLandHoldings(landHoldingsData);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <CreateOwner fetchData={fetchData} />
            <CreateLandHolding fetchData={fetchData} />
            <LandHoldingList landHoldings={landHoldings} setLandHoldings={setLandHoldings} fetchData={fetchData} />
            <OwnersList owners={owners} setOwners={setOwners} fetchData={fetchData} />
        </div>
    );
};

export default Services;
