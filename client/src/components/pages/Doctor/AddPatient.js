import { useState } from "react";

const AddPatient = (props) => {
    const [name, setName] = useState("");
    const [addr, setAddr] = useState("");

    const handleRegister = () => {
        console.log(name);
        if (name.length > 0 && addr.length === 42) {
            props.registerPatient(name, addr);
        }
    };

    return (
        <div>
            <h2>Welcome, Doctor</h2>
            <div className="welcome_flex">
                <h2>Register a Patient</h2>
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
                            type="number"
                            placeholder="Age"
                            className="inp"
                            // onChange={(e) => setAddr(e.target.value)}
                        />
                    </div>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default AddPatient;
