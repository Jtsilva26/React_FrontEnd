import React, { useState } from 'react';
import app from './realmApp';

const createLandHolding = async (name, size) => {
    try {
        const result = await app.currentUser.callFunction("createLandHolding", { name, size });
        console.log("Land Holding Created:", result);
    } catch (err) {
        console.error("Failed to create land holding", err);
        throw err;
    }
};

const CreateLandHolding = ({ user }) => {
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [error, setErroe] = useState(null);


    const handleSubmit = async () => {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("Owners_DB").collection("landHoldings");

        // Prevent duplicate entries
        const existing = await collection.findOne({ name });
        if (existing) {
            alert("A land holding with this name already exists.");
            return;
        }

        await collection.insertOne({ name, size });
        alert("Land holding created successfully!");
    };

    return (
        <div>
            <h2>Create Land Holding</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            />
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default CreateLandHolding;
