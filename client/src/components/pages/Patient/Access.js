import React, { useState } from "react";

const Access = (props) => {
    const [docAddr, setDocAddr] = useState("");
    // const [doctorSearch, setDoctorSearch] = useState({});
    const [access, setAccess] = useState(false);

    const handleRegister = async () => {
        if (docAddr.length === 42) {
            await props.grantDoctorAccess(docAddr);
        }
        setAccess(true);
    };

    return (
        <div>
            <h2>Welcome, Patient</h2>
            <div className="welcome_flex">
                <h2>Grant Access To Doctor</h2>
                <div className="welcome">
                    <input
                        type="text"
                        placeholder="Enter Doctor's Address"
                        className="inp"
                        onChange={(e) => setDocAddr(e.target.value)}
                    />
                    <button
                        className="button"
                        style={{ fontSize: "1.25rem", textTransform: "uppercase" }}
                        onClick={handleRegister}
                    >
                        Grant
                    </button>
                    <p style={{ color: "green" }}>{access ? "Access Granted" : ""}</p>
                </div>
            </div>
        </div>
    );
};

export default Access;
