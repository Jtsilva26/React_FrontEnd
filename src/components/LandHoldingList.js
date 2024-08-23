import React, { useEffect, useState } from 'react';
import app from '../realmApp';
import './LandHoldingsList.css'

const LandHoldingList = ({ user, landHoldings, setLandHoldings, fetchData }) => {
    const [owners, setOwners] = useState({}); // Object to map owner IDs to names

    useEffect(() => {
        const fetchOwners = async () => {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("Owners");
            const ownersData = await collection.find({});
            const ownersMap = {};
            ownersData.forEach(owner => {
                ownersMap[owner._id] = owner.ownerName;
            });
            setOwners(ownersMap);
        };

        fetchOwners();
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
            <table className="table-container">
                <thead className="table-header">
                    <tr>
                        <th>Owner ID</th>
                        <th>Legal Entity</th>
                        <th>Net Mineral Acres</th>
                        <th>Mineral Owner Royalty (%)</th>
                        <th>Section</th>
                        <th>Township</th>
                        <th>Range</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {landHoldings.map(holding => (
                        <tr key={holding._id}>
                            <td>{owners[holding.ownerId]}</td>
                            <td>{holding.legalEntity}</td>
                            <td>{holding.netMineralAcres}</td>
                            <td>{holding.mineralOwnerRoyalty}</td>
                            <td>{holding.section}</td>
                            <td>{holding.township}</td>
                            <td>{holding.range}</td>
                            <td>
                                <button className="button-delete" onClick={() => handleDelete(holding._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LandHoldingList;
