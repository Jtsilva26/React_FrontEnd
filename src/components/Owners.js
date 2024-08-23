import React, { useState } from 'react';
import app from '../realmApp';
import './Owners.css';

const CreateOwner = ({ fetchData }) => {
    const [ownerName, setOwnerName] = useState('');
    const [entityType, setEntityType] = useState('');
    const [ownerType, setOwnerType] = useState('');
    const [address, setAddress] = useState('');
    const [totalLandHoldings, setTotalLandHoldings] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const result = await app.currentUser.callFunction("Duplicate", {
                ownerName,
                entityType,
                ownerType,
                address,
                totalLandHoldings: 0, // Initialize total land holdings to 0
                landHoldings: [] // Initialize land holdings as an empty array
            });
            // Check the status from the result and set messages accordingly
            if (result.status === "failed") {
                setError(result.message);
                setStatusMessage('');
            } else {
                setStatusMessage(result.message);
                setError('');
                resetForm();
                fetchData();
            }
        } catch (err) {
            setError("An error occurred while creating the owner. Please try again.");
            setStatusMessage('');
        }
    };

    const resetForm = () => {
        setOwnerName('');
        setEntityType('');
        setOwnerType('');
        setAddress('');
        setTotalLandHoldings(0);
    };

    return (
        <div className="create-owner-container">
            <h2>Create Owner</h2>
            {error && <div className="error-message">{error}</div>}
            {statusMessage && <div className="success-message">{statusMessage}</div>}
            <div>
                <label className="label">Name: </label>
                <input
                    className="input"
                    type="text"
                    placeholder="Owner Name"
                    onChange={(e) => setOwnerName(e.target.value)}
                />
            </div>
            <div>
                <label className="label">Entity Type: </label>
                <select className="select" onChange={(e) => setEntityType(e.target.value)}>
                    <option value="">Select Entity Type</option>
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                    <option value="Investor">Investor</option>
                    <option value="Trust">Trust</option>
                </select>
            </div>
            <div>
                <label className="label">Owner Type: </label>
                <select className="select" onChange={(e) => setOwnerType(e.target.value)}>
                    <option value="">Select Owner Type</option>
                    <option value="Competitor">Competitor</option>
                    <option value="Seller">Seller</option>
                    <option value="Investor">Investor</option>
                    <option value="Professional">Professional</option>
                </select>
            </div>
            <div>
                <label className="label">Address: </label>
                <input
                    className="input"
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button className="button" onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default CreateOwner;