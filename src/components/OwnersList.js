import React, { useState, useEffect } from 'react';
import app from '../realmApp';


const OwnersList = ({ owners, setOwners, fetchData }) => {
    const [selectedOwnerId, setSelectedOwnerId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

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