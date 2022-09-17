import { useState } from "react";
import Swal from "sweetalert2";
import { createDonor } from "../../../api/requests";

const Donors = (props) => {
    const [addr, setAddr] = useState("");
    const [mobile, setMobile] = useState(0);
    const [email, setEmail] = useState("");
    const [accept, setAccept] = useState(false);
    const link =
        "https://en.wikipedia.org/wiki/Blood_donation_in_India#:~:text=Criteria%20to%20donate%20blood,-There%20are%20several&text=The%20donor%20must%20be%20fit,minimum%20of%2012.5%20g%2FdL.";

    const openModal = () => {
        Swal.fire({
            title: "Give Blood Save Life",
            html: `Please make you are qualify the <a href=${link} target="_blank">criteria<a/> of being a blood donor.
            Once you donate blood to a patient, you will not be allowed to donate blood till <b>8 weeks</b>.<br>
            Please note that you will be examined by a doctor when you reach the corresponding blood donation center
            before the Blood transfusion process. You will be allowed to donate blood only when you receive a positive
            result from the examination process.<br>
            If you agree to the above terms, please accept below`,
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#741188",
            confirmButtonText: !accept ? "I Accept" : "I Do Not Accept",
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire("Deleted!", "Your file has been deleted.", "success");
                setAccept(!accept);
            }
        });
    };

    const handleRegister = async () => {
        console.log(addr, mobile, email, accept);
        if (addr.length === 42 && mobile > 0 && email.length > 0 && accept) {
            const details = await props.getPatientDetails(addr);
            console.log(details);
            if (!details._state) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Invalid Patient",
                    showConfirmButton: true,
                });
            } else {
                const response = await createDonor({ details, mobile, email });
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: response.data !== null ? "success" : "error",
                    title:
                        response.data !== null ? "Donor Registration Successfull" : response.error,
                    showConfirmButton: true,
                });
            }
        } else {
            alert("DETAILS MISSING");
        }
    };

    const removeDonor = () => {
        console.log("removed");
    };

    return (
        <div>
            <h2>BECOME A BLOOD DONOR</h2>
            <div className="welcome_flex">
                <h2>Please fill the below details</h2>
                <div className="welcome">
                    <input
                        type="text"
                        placeholder="Enter your Address to confirm"
                        className="inp"
                        onChange={(e) => setAddr(e.target.value)}
                    />
                    <div className="inside_welcome">
                        <input
                            type="number"
                            min={1000000000}
                            max={9999999999}
                            placeholder="Enter your mobile number"
                            className="inp"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter your email address"
                            className="inp"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <p
                        style={{
                            color: "blue",
                            fontSize: "1rem",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                        onClick={openModal}
                    >
                        Please accept the terms and contidions here
                    </p>
                    <button
                        className="button"
                        style={{ fontSize: "1.25rem", textTransform: "uppercase" }}
                        onClick={handleRegister}
                    >
                        Continue
                    </button>
                    <div>
                        <p
                            style={{
                                fontSize: "1.3rem",
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            If you are already a Blood Donor, but no longer want to contine,{" "}
                            <a
                                href
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={removeDonor}
                            >
                                Click
                            </a>{" "}
                            here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donors;
