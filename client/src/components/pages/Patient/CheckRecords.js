import React, { useState } from "react";
import Image from "../../shared/Image";

const CheckRecords = (props) => {
    const [addr, setAddr] = useState("");
    const [patientDetails, setPatientDetails] = useState({});
    const [imageArray, setImageArray] = useState([]);

    const handleSearch = async () => {
        let details;
        if (addr.length === 42) {
            details = await props.getPatientDetails(addr);
            console.log(details);
            if (!details._state) {
                details._name = "N.A.";
                details._paId = "N.A.";
                details.records = "N.A.";
            }
        }
        setPatientDetails(details);
        setImageArray(details._paRecords);
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
                        <button
                            className="button"
                            style={{ fontSize: "1.25rem", textTransform: "uppercase" }}
                            onClick={handleSearch}
                        >
                            Get Details
                        </button>
                    </div>
                    <p>Search Results</p>
                    <p>Address: {patientDetails._paId}</p>
                    <p>Name: {patientDetails._paName}</p>
                    <div style={{ display: "flex", gap: "200px" }}>
                        <p style={{ margin: "0", padding: "0" }}>Age: {patientDetails._paAge}</p>
                        <p style={{ margin: "0", padding: "0" }}>
                            Blood Group: {patientDetails._paBloodGroup}
                        </p>
                    </div>
                    <p>Records Appear Below:</p>
                    <div className="display__images">
                        {imageArray.map((src, idx) => {
                            return (
                                <div key={idx} className="image__input">
                                    <Image details={{ src: src, index: idx }} handleDelete={null} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckRecords;
