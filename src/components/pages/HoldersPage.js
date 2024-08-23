import React, { useEffect, useState } from 'react';
import CreateLandHolding from '../CreateLandHolding';
import LandHoldingList from '../LandHoldingList';
import { useAuth } from '../../AuthContext';
import app from '../../realmApp';

const HoldersPage = () => {
    const { user } = useAuth();
    const [landHoldings, setLandHoldings] = useState([]); // State to hold land holdings

    // Function to fetch land holdings
    const fetchData = async () => {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("Owners_DB").collection("LandHoldings");
        const data = await collection.find({});
        setLandHoldings(data);
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        <div className="holders-page">
            <h2>Land Holders</h2>
            <CreateLandHolding fetchData={fetchData} />
            <LandHoldingList user={user} landHoldings={landHoldings} setLandHoldings={setLandHoldings} fetchData={fetchData} />
        </div>
    );
};

export default HoldersPage;
