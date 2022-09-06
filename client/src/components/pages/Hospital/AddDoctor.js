import React, { useState } from "react";

const AddDoctor = (props) => {
    const [name, setName] = useState("");
    const [addr, setAddr] = useState("");
    const [spec, setSpec] = useState("");

    const handleRegister = () => {
        if (name.length > 0 && spec.length > 0 && addr.length === 42) {
            props.registerDoctor(name, spec, addr);
        } else {
            alert("INVALID DETAILS");
        }
    };

    return (
        <div>
            <h2>Welcome, Admin from the Hospital</h2>
            <div className="welcome_flex">
                <h2>Register a Doctor</h2>
                <div className="welcome">
                    <input
                        type="text"
                        placeholder="Ethereum address"
                        className="inp"
                        onChange={(e) => setAddr(e.target.value)}
                    />
                    <div className="inside_welcome">
                        <input
                            type="text"
                            placeholder="Name"
                            className="inp"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            className="inp"
                            onChange={(e) => setSpec(e.target.value)}
                        />
                    </div>
                    <button
                        className="button"
                        style={{ fontSize: "1.25rem", textTransform: "uppercase" }}
                        onClick={handleRegister}
                    >
                        REGISTER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
