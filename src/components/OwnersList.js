import React, { useEffect, useState } from 'react';
import app from '../realmApp';
import './OwnersList.css';

const OwnersList = ({ owners, fetchData }) => {
    const [selectedOwnerId, setSelectedOwnerId] = useState(''); //Id of the selected owner for deletion
    const [ownerHoldingsCount, setOwnerHoldingsCount] = useState({}); //Map of Owner IDs to their holding count

    useEffect(() => {
        const fetchHoldingsCounts = async () => {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");

            const allHoldings = await collection.find(); //Fetch all holdings
            const counts = {}; //Initialize empty count object

            //Counts the number of land holdings for each owner
            allHoldings.forEach(holding => {
                const ownerId = holding.ownerId; //Get the owner ID form
                counts[ownerId] = (counts[ownerId] || 0) + 1; //Increments the count for owner
            });

            setOwnerHoldingsCount(counts); //Update state with counts

        };

        //Only fetch counts if there are owners available
        if (owners.length > 0) {
            fetchHoldingsCounts();
        }
    }, [owners]); //Dependency array runs when the owner array changes

    const handleDelete = async () => {
        //Confirmation for deletion
        if (window.confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
            try {
                //Calls the "Delete" function in MongoDB Realm server
                const result = await app.currentUser.callFunction("Delete", { ownerId: selectedOwnerId });
                if (result.status === "success") {
                    alert(result.message);
                    fetchData(); //Refresh data
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
            <h2>Owners List</h2>
            <table className="owners-table">
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Entity Type</th>
                        <th>Owner Type</th>
                        <th>Total Land Holdings</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map(owner => (
                        <tr key={owner._id}>
                            <td>{owner.ownerName}</td>
                            <td>{owner.entityType || "N/A"}</td>
                            <td>{owner.ownerType || "N/A"}</td>
                            <td>{ownerHoldingsCount[owner._id] || 0}</td>
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
