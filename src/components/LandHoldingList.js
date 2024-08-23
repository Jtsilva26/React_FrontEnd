import React, { useEffect, useState } from 'react';
import app from '../realmApp';

const LandHoldingList = ({ user, landHoldings, setLandHoldings, fetchData }) => {

    useEffect(() => {
        const fetchLandHoldings = async () => {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");
            const data = await collection.find({});
            setLandHoldings(data);
        };

        fetchLandHoldings();
    }, [user]);

    const handleDelete = async (id) => {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("Owners_DB").collection("LandHoldings");
        await collection.deleteOne({ _id: id });
        setLandHoldings(landHoldings.filter(item => item._id !== id));
        fetchData();
    };

    return (
        <div>
            <h2>Land Holdings</h2>
            <ul>
                {landHoldings.map(holding => (
                    <li key={holding._id}>
                        {holding.id} - {holding.size} acres
                        <button onClick={() => handleDelete(holding._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LandHoldingList;
