import { useState } from "react";
import Image from "../../shared/Image";

const PatientDetails = (props) => {
    const [patAddr, setPatAddr] = useState("");
    const [patientSearch, setPatientSearch] = useState({});
    const [imageArray, setImageArray] = useState([]);

    const handleSearch = async () => {
        let details = {};
        if (patAddr.length === 42) {
            details = await props.getPatientDetails(patAddr);
            console.log(details);
            if (details._state) {
                setPatientSearch(details);
                setImageArray(details._paRecords);
            } else {
                alert("SOME ERROR OCCURED");
            }
            // await props.getHealthRecords(patAddr);
        }
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
                <div style={{ display: "flex", gap: "200px" }}>
                    <p style={{ margin: "0", padding: "0" }}>Age: {patientSearch._paAge}</p>
                    <p style={{ margin: "0", padding: "0" }}>
                        Blood Group: {patientSearch._paBloodGroup}
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
    );
};

export default PatientDetails;
