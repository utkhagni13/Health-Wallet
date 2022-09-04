import React, { useState } from "react";

const DoctorDetails = (props) => {
    const [docAddr, setDocAddr] = useState("");
    const [doctorSearch, setDoctorSearch] = useState({});

    const handleSearch = async () => {
        let details;
        if (docAddr.length === 42) {
            details = await props.getDoctorDetails(docAddr);
            console.log(details);
            if (!details._state) {
                details._name = "N.A.";
                details._drId = "N.A.";
                details._speciality = "N.A.";
            }
        }
        setDoctorSearch(details);
    };

    return (
        <div>
            <h2>Welcome, Admin from the Hospital</h2>
            <div className="welcome_flex">
                <div className="card1">
                    <h2>Search a Doctor</h2>
                    <div className="welcome">
                        <input
                            type="text"
                            placeholder="Enter Doctor's Address"
                            className="inp"
                            onChange={(e) => setDocAddr(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <p>Search Results</p>
                    <p>Name: {doctorSearch._name}</p>
                    <p>Address: {doctorSearch._drId}</p>
                    <p>Department: {doctorSearch._speciality}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
