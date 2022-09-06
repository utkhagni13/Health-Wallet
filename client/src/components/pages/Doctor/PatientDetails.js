import { useState } from "react";

const PatientDetails = (props) => {
    const [patAddr, setPatAddr] = useState("");
    const [patientSearch, setPatientSearch] = useState({});

    const handleSearch = () => {
        let details = {};
        // if (patAddr.length === 42) {
        //     // details = await props.getPatientDetails(patAddr);
        //     console.log(details);
        //     if (details._state) setPatientSearch(details);
        //     else {
        //         details._paName = "N.A.";
        //         details._paId = "N.A.";
        //     }
        // }
        details._paName = "Patient-1";
        details._paRecords = "N.A.";
        details._paId = "0x1cF00ec03AA1796232bA00ED341780Dacd6dd378";
        setPatientSearch(details);
    };

    return (
        <div>
            <h2>Welcome, Doctor</h2>
            <div className="welcome_flex">
                <h2>Search a Patient</h2>
                <div className="welcome">
                    <input
                        type="text"
                        placeholder="Enter Patient's Address"
                        className="inp"
                        onChange={(e) => setPatAddr(e.target.value)}
                    />
                    <button
                        className="button"
                        style={{ fontSize: "1.25rem", textTransform: "uppercase" }}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <p>Search Results</p>
                <p>Name: {patientSearch._paName}</p>
                <p>Address: {patientSearch._paId}</p>
                <p>Records: {patientSearch._paRecords}</p>
            </div>
        </div>
    );
};

export default PatientDetails;
