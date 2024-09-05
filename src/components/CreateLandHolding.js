import React, { useState, useEffect } from 'react';
import app from '../realmApp';
import './CreateLandHolding.css';

const CreateLandHolding = ({ fetchData }) => {
    //State variables for managing form data and error/success messages
    const [owners, setOwners] = useState([]); //List of owners fetched from the database
    const [selectedOwnerId, setSelectedOwnerId] = useState(''); //Selected owner's ID
    const [legalEntity, setLegalEntity] = useState(''); //Legal entity name
    const [netMineralAcres, setNetMineralAcres] = useState(0); //Net mineral acres
    const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState(0); //Royalty percentage
    const [section, setSection] = useState(''); //Section number
    const [township, setTownship] = useState(''); //Township designation
    const [range, setRange] = useState(''); //Range description
    const [titleSource, setTitleSource] = useState(''); //Source of title information
    const [sectionName, setSectionName] = useState(''); //Section Name
    const [name, setName] = useState(''); // Name associated with the land holding
    const [error, setError] = useState(''); //Error message state
    const [statusMessage, setStatusMessage] = useState(''); //Success message state

    //Fetch owners when component mounts
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                //Call function to fetch owners
                const ownersData = await app.currentUser.callFunction("getOwners");
                setOwners(ownersData); //Update owners dtate with fetched data

            } catch (err) {
                setError("Error fetching owners.");
                setOwners([]); //Clears owners list on error
            }
        };

        fetchOwners(); //call fetchOwners function
    }, []); //Empty dependency array to run only once

    //Handle form submission for creating a land holding
    const handleSubmit = async () => {
        //Validates required fields
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

        //Attempt to create a new land holding in the database
        try {
            const mongo = app.currentUser.mongoClient("mongodb-atlas"); //Get MongoDB Client
            const collection = mongo.db("Owners_DB").collection("LandHoldings"); //Refer to Landholdings collection

            //Insert the new land holding document
            await collection.insertOne({
                ownerId: selectedOwnerId, // Use selectedOwnerId for the owner
                legalEntity,
                netMineralAcres,
                mineralOwnerRoyalty,
                sectionName: `${section}-${township}-${range}`, // Combine into Section-Township-Range format
                name: `${sectionName}-${legalEntity}`, // Combine section-legalEntity
                section,
                township,
                range,
                titleSource
            });

            setStatusMessage("Land Holding created successfully!");
            setError(''); // Clear any previous error messages
            fetchData(); //Fetch updated data
            resetForm(); //Reset form fields after submission
        } catch (error) {
            console.error("Error details:", error); // Log the full error object for debugging
            setError("Error creating Land Holding. Please try again.");
            setStatusMessage(''); // Clear any previous success messages
        }
    };

    //Reset form fiels to intial state
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

            {/* Owner Selection */}
            <div>
                <label className="label">Owner: </label>
                <select className="select" onChange={(e) => setSelectedOwnerId(e.target.value)} value={selectedOwnerId}>
                    <option value="">Select Owner</option>
                    {owners.map(owner => (
                        <option key={owner._id} value={owner._id}>{owner.ownerName}</option>
                    ))}
                </select>
            </div>

            {/* Legal Entity Input */}
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

            {/* Net Mineral Acres Input */}
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

            {/* Mineral Owner Royalty Input */}
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

            {/* Section Input */}
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

            {/* Township Input */}
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

            {/* Range Input */}
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

            {/* Title Source selection */}
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
            {/* Create Button */}
            <button className="button" onClick={handleSubmit}>Create</button>
        </div>

    );
};

export default CreateLandHolding;