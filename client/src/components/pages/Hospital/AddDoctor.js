import React, { useState } from "react";

const AddDoctor = (props) => {
    const [name, setName] = useState("");
    const [addr, setAddr] = useState("");

    const handleRegister = () => {
        console.log(name);
        if (name.length > 0 && addr.length === 42) {
            props.registerDoctor(name, addr);
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
                        placeholder="Name"
                        className="inp"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ethereum address"
                        className="inp"
                        onChange={(e) => setAddr(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        className="inp"
                        // onChange={(e) => setAddr(e.target.value)}
                    />
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
