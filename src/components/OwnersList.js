import React, { useEffect, useState } from 'react';
import app from '../realmApp';
import './OwnersList.css';

const OwnersList = ({ owners, setOwners, fetchData }) => {
    // State variables to manage selected owner, status messages, errors, and holdings count
    const [selectedOwnerId, setSelectedOwnerId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');
    // Object to store count of land holdings for each owner
    const [ownerHoldingsCount, setOwnerHoldingsCount] = useState({});

    // useEffect to fetch land holdings counts when owners are updated
    useEffect(() => {
        const fetchHoldingsCounts = async () => {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");

            try {
                // Fetch all land holdings from the database
                const allHoldings = await collection.find();

                // Initialize an object to hold the counts
                const counts = {};

                // Iterates through each holding and counts total number of land holdings
                allHoldings.forEach(holding => {
                    // Gets the ownerId from the holding
                    const ownerId = holding.ownerId;
                    // Increments the count for the owner
                    counts[ownerId] = (counts[ownerId] || 0) + 1;
                });

                // Update the state with the counts
                setOwnerHoldingsCount(counts);
            } catch (err) {
                console.error("Error fetching land holdings:", err); // Log any errors encountered
            }
        };

        // Fetch holdings counts only if there are owners present
        if (owners.length > 0) {
            fetchHoldingsCounts();
        }
    }, [owners]); // Dependency array - effect runs when 'owners' changes

    // Function to handle the deletion of an owner
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
            try {
                // Call the delete function in the server-side function
                const result = await app.currentUser.callFunction("Delete", { ownerId: selectedOwnerId });
                if (result.status === "success") {
                    alert(result.message); // Alert the user if deletion was successful
                    fetchData(); // Refresh the data after deletion
                } else {
                    alert(`Error: ${result.message}`); // Alert the user if there was an error
                }
            } catch (err) {
                alert(`Error: ${err.message}`); // Handle any errors during the delete operation
            }
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
            {statusMessage && <div className="success-message">{statusMessage}</div>} {/* Display success message if exists */}
            <h2>Owners List</h2>
            <table className="owners-table"> {/* Table to display owners and their holdings */}
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Total Land Holdings</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map(owner => (
                        <tr key={owner._id}>
                            <td>{owner.ownerName}</td>
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
