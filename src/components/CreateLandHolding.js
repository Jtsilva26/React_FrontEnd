import React, { useState, useEffect } from 'react';
import app from '../realmApp';
import './CreateLandHolding.css';

const CreateLandHolding = ({ fetchData }) => {
    const [owners, setOwners] = useState([]);
    const [selectedOwnerId, setSelectedOwnerId] = useState('');
    const [legalEntity, setLegalEntity] = useState('');
    const [netMineralAcres, setNetMineralAcres] = useState(0);
    const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState(0);
    const [section, setSection] = useState('');
    const [township, setTownship] = useState('');
    const [range, setRange] = useState('');
    const [titleSource, setTitleSource] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const ownersData = await app.currentUser.callFunction("getOwners");
                setOwners(ownersData);

            } catch (err) {
                setError("Error fetching owners.");
                setOwners([]);
            }
        };

        fetchOwners();
    }, []);

    const handleSubmit = async () => {

        if (!owners || !legalEntity || !netMineralAcres || !mineralOwnerRoyalty || !section || !township || !range || !titleSource) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!/^\d{3}$/.test(section)) {
            setError("Section must be exactly 3 digits.");
            return;
        }

        if (!/^\d{3}[NS]$/.test(township)) {
            setError("Township must be 4 characters: first 3 digits followed by 'N' or 'S'.");
            return;
        }

        if (!/^\d{3}[EW]$/.test(range)) {
            setError("Range must be 4 characters: first 3 digits followed by 'E' or 'W'.");
            return;
        }

        try {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");

            await collection.insertOne({
                ownerId: selectedOwnerId, // Use selectedOwnerId for the owner
                legalEntity,
                netMineralAcres,
                mineralOwnerRoyalty,
                sectionName: `${section}-${township}-${range}`, // Combine into Section-Township-Range format
                name: `${sectionName}-${legalEntity}`,
                section,
                township,
                range,
                titleSource
            });

            setStatusMessage("Land Holding created successfully!");
            setError(''); // Clear any previous error messages
            fetchData();
            resetForm();
        } catch (error) {
            console.error("Error details:", error); // Log the full error object for debugging
            setError("Error creating Land Holding. Please try again.");
            setStatusMessage(''); // Clear any previous success messages
        }
    };

    const resetForm = () => {
        setName('');
        setSelectedOwnerId('');
        setLegalEntity('');
        setNetMineralAcres(0);
        setMineralOwnerRoyalty(0);
        setSection('');
        setTownship('');
        setRange('');
        setTitleSource('');
    };

    return (
        <div className="create-land-holding-container">
            <h2>Create Land Holding</h2>
            {error && <div className="error-message">{error}</div>}
            {statusMessage && <div className="success-message">{statusMessage}</div>}

            <div>
                <label className="label">Owner: </label>
                <select className="select" onChange={(e) => setSelectedOwnerId(e.target.value)} value={selectedOwnerId}>
                    <option value="">Select Owner</option>
                    {owners.map(owner => (
                        <option key={owner._id} value={owner._id}>{owner.ownerName}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="label">Legal Entity: </label>
                <input
                    className="input"
                    type="text"
                    placeholder="Legal Entity"
                    onChange={(e) => setLegalEntity(e.target.value)}
                    value={legalEntity}
                />
            </div>
            <div>
                <label className="label">Net Mineral Acres: </label>
                <input
                    className="input"
                    type="number"
                    placeholder="Net Mineral Acres"
                    onChange={(e) => setNetMineralAcres(e.target.value)}
                    value={netMineralAcres}
                />
            </div>
            <div>
                <label className="label">Mineral Owner Royalty (%): </label>
                <input
                    className="input"
                    type="number"
                    placeholder="Mineral Owner Royalty (%)"
                    onChange={(e) => setMineralOwnerRoyalty(e.target.value)}
                    value={mineralOwnerRoyalty}
                />
            </div>
            <div>
                <label className="label">Section: </label>
                <input
                    className="input"
                    type="text"
                    placeholder="Section (3 characters)"
                    onChange={(e) => setSection(e.target.value)}
                    value={section}
                />
            </div>
            <div>
                <label className="label">Township: </label>
                <input
                    className="input"
                    type="text"
                    placeholder="Township (4 characters)"
                    onChange={(e) => setTownship(e.target.value)}
                    value={township}
                />
            </div>
            <div>
                <label className="label">Range: </label>
                <input
                    className="input"
                    type="text"
                    placeholder="Range (4 characters)"
                    onChange={(e) => setRange(e.target.value)}
                    value={range}
                />
            </div>
            <div>
                <label className="label">Title Source: </label>
                <select className="select" onChange={(e) => setTitleSource(e.target.value)} value={titleSource}>
                    <option value="">Select Title Source</option>
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                    <option value="Class C">Class C</option>
                    <option value="Class D">Class D</option>
                </select>
            </div>
            <button className="button" onClick={handleSubmit}>Create</button>
        </div>

    );
};

export default CreateLandHolding;