import React, { useEffect, useState } from 'react';
import app from '../realmApp';
import './OwnersList.css';

const OwnersList = ({ owners, setOwners, fetchData }) => {
    const [selectedOwnerId, setSelectedOwnerId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');
    const [ownerHoldingsCount, setOwnerHoldingsCount] = useState({});

    useEffect(() => {
        const fetchHoldingsCounts = async () => {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");

            try {
                const allHoldings = await collection.find();
                const counts = {};

                allHoldings.forEach(holding => {
                    const ownerId = holding.ownerId;
                    counts[ownerId] = (counts[ownerId] || 0) + 1;
                });

                setOwnerHoldingsCount(counts);
            } catch (err) {
                console.error("Error fetching land holdings:", err);
            }
        };

        if (owners.length > 0) {
            fetchHoldingsCounts();
        }
    }, [owners]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
            try {
                const result = await app.currentUser.callFunction("Delete", { ownerId: selectedOwnerId });
                if (result.status === "success") {
                    alert(result.message);
                    fetchData();
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            {statusMessage && <div className="success-message">{statusMessage}</div>}
            <h2>Owners List</h2>
            <table className="owners-table">
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Entity Type</th>
                        <th>Owner Type</th>
                        <th>Total Land Holdings</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map(owner => (
                        <tr key={owner._id}>
                            <td>{owner.ownerName}</td>
                            <td>{owner.entityType || "N/A"}</td>
                            <td>{owner.ownerType || "N/A"}</td>
                            <td>{ownerHoldingsCount[owner._id] || 0}</td>
                            <td>
                                <button onClick={() => setSelectedOwnerId(owner._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label>Select Owner to Delete: </label>
                <select onChange={(e) => setSelectedOwnerId(e.target.value)} value={selectedOwnerId}>
                    <option value="">Select Owner</option>
                    {owners.map(owner => (
                        <option key={owner._id} value={owner._id}>{owner.ownerName}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleDelete} disabled={!selectedOwnerId}>Delete Owner</button>
        </div>
    );
};

export default OwnersList;
