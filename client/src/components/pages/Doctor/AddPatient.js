import { useState } from "react";
import ImageArray from "../../shared/ImageArray";
import "../../../styles/dropdown.scss";
import "../../../styles/Login.scss";

const bloodGrpValidate = (str) => {
    if (str.length < 2 || str.length > 3) return false;
    if (str.length === 3) {
        if (str[0] === "A" && str[1] === "B" && str[2] === "+") return true;
        if (str[0] === "A" && str[1] === "B" && str[2] === "-") return true;
    }
    if (str.length === 2) {
        if (str[0] === "A" && str[1] === "-") return true;
        if (str[0] === "A" && str[1] === "+") return true;
        if (str[0] === "B" && str[1] === "-") return true;
        if (str[0] === "B" && str[1] === "+") return true;
        if (str[0] === "O" && str[1] === "-") return true;
        if (str[0] === "O" && str[1] === "+") return true;
    }
    return false;
};

const AddPatient = (props) => {
    const [name, setName] = useState("");
    const [addr, setAddr] = useState("");
    const [age, setAge] = useState(0);
    const [bloodGrp, setBloodGrp] = useState("");
    const [hospitalAddr, setHospitalAddr] = useState("");
    const [imageArray, setImageArray] = useState([]);

    const handleRegister = () => {
        if (!bloodGrpValidate(bloodGrp)) {
            alert("INVALID BLOOD GROUP ENTERED");
            return;
        }
        if (name.length > 0 && addr.length === 42 && age > 0 && hospitalAddr.length === 42) {
            props.registerPatient({ name, addr, age, bloodGrp, hospitalAddr, imageArray });
        } else {
            alert("INVALID DETAILS");
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
                            style={{ visibility: "hidden" }}
                            onChange={(e) => setAddr(e.target.value)}
                        />
                    </div>
                    <div className="inside_welcome">
                        <input
                            type="number"
                            placeholder="Age"
                            min={"1"}
                            className="inp"
                            style={{ flex: "1" }}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <div className="inside_welcome" style={{ flex: "1" }}>
                            {/* <label htmlFor="standard-select">Standard Select</label> */}
                            <div style={{ flex: "1" }} className="select">
                                <select
                                    onChange={(e) => setBloodGrp(e.target.value)}
                                    id="standard-select"
                                >
                                    <option value="NA">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                                <span className="focus"></span>
                            </div>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Hospital Address"
                        className="inp"
                        onChange={(e) => setHospitalAddr(e.target.value)}
                    />
                </div>
                <p>Upload Patient's Records</p>
                <ImageArray imageArray={imageArray} setImageArray={setImageArray} />
                <p></p>
                <button
                    className="button"
                    style={{ fontSize: "1.25rem", textTransform: "uppercase" }}
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default AddPatient;
