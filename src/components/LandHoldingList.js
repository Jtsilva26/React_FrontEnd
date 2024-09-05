import React, { useEffect, useState } from 'react';
import app from '../realmApp';
import './LandHoldingsList.css'

const LandHoldingList = ({ user, landHoldings, setLandHoldings, fetchData }) => {
    const [owners, setOwners] = useState({}); //Initialize an empty object to map owner IDS to names

    //useEffect hook to fetch owners from the database when the component mounts or user changes
    useEffect(() => {
        const fetchOwners = async () => {
            const mongo = app.currentUser.mongoClient("mongodb-atlas"); //Get MongoDB Client
            const collection = mongo.db("Owners_DB").collection("Owners"); //Refer to Owners collection
            const ownersData = await collection.find({}); //Fetches all owners data from the collection
            const ownersMap = {}; //Initialize an object to hold the mapping of owner IDS to names

            //Creates a mapping of owner IDS to owner names
            ownersData.forEach(owner => {
                ownersMap[owner._id] = owner.ownerName; //Map each owner ID to corresponding name
            });
            setOwners(ownersMap); //Updates the owners state with the created mapping
        };

        fetchOwners(); //call fetchOwners function
    }, [user]); //Dependency array to re-run the effect when the user changes

    //Function to handle the deletion of a land holding
    const handleDelete = async (id) => {
        const mongo = app.currentUser.mongoClient("mongodb-atlas"); //Get MongoDB Client
        const collection = mongo.db("Owners_DB").collection("LandHoldings"); //Refer to LandHoldings collection
        await collection.deleteOne({ _id: id }); //Delete land holding from database
        setLandHoldings(landHoldings.filter(item => item._id !== id)); //Update the local state by filtering the deleted holding
        fetchData(); //Call fetchData to update the displayed list
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
                    {/* Map through landHoldings to create table rows fro each land holding */}
                    {landHoldings.map(holding => (
                        <tr key={holding._id}> {/* Unique key for each row */}
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
