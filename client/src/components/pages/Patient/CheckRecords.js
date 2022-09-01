import React, { useState } from "react";

const CheckRecords = (props) => {
    const [addr, setAddr] = useState("");
    const [patientDetails, setPatientDetails] = useState({});

    const handleSearch = async () => {
        let details;
        if (addr.length === 42) {
            details = await props.getPatientDetails(addr);
            console.log(details);
            if (!details._state) {
                details._name = "N.A.";
                details._paId = "N.A.";
            }
        }
        details.records = "N.A.";
        setPatientDetails(details);
    };

    return (
        <div>
            <h2>Welcome, Patient</h2>
            <div className="welcome_flex">
                <div className="card1">
                    <h2>Check your records</h2>
                    <div className="welcome">
                        <input
                            type="text"
                            placeholder="Account address"
                            className="inp"
                            onChange={(e) => setAddr(e.target.value)}
                        />
                        <button onClick={handleSearch}>Get Details</button>
                    </div>
                    <p>Search Results</p>
                    <p>Name: {patientDetails._paName}</p>
                    <p>Address: {patientDetails._paId}</p>
                    <p>Records: {patientDetails.records}</p>
                </div>
            </div>
        </div>
    );
};

export default CheckRecords;
