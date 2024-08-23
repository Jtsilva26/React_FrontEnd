import React, { useEffect, useState } from 'react';
import Owners from '../Owners';
import OwnersList from '../OwnersList';
import app from '../../realmApp';

const OwnersPage = () => {
    const [owners, setOwners] = useState([]);


    const fetchData = async () => {
        try {
            const result = await app.currentUser.callFunction("getOwners");
            if (result) {
                setOwners(result);
            }
        } catch (error) {
            console.error("Error fetching owners:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="owners-page">
            <h1>Manage Owners</h1>
            <Owners fetchData={fetchData} />
            <OwnersList owners={owners} setOwners={setOwners} fetchData={fetchData} />
        </div>
    );
};

export default OwnersPage;