import { useState } from "react";
import { MdOutlineHomeWork, MdPersonalInjury, MdPersonAddAlt1 } from "react-icons/md";

const Login = (props) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const detectProvider = () => {
        let provider;
        console.log("login10: ", provider);
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            window.alert("No Ethereum browser detected! Check out MetaMask");
        }
        console.log("login18: ", provider);
        return provider;
    };

    const onLoginHandler = async (role) => {
        const provider = detectProvider();
        if (provider) {
            if (provider !== window.ethereum) {
                console.error(
                    "Not window.ethereum provider. Do you have multiple wallet installed ?"
                );
            }
            setIsConnecting(true);
            await provider.request({
                method: "eth_requestAccounts",
            });
            setIsConnecting(false);
        }
        props.onLogin(provider);
        props.setRole(role);
    };

    return (
        <div className="login">
            <h2 style={{ color: "rgb(245, 237, 0)" }}>
                Health Record &amp; Blood Donation Chain Management System
            </h2>
            <p style={{ marginTop: "0px" }}>Please select your role and login...</p>
            <button onClick={() => onLoginHandler("p")} className="button" type="button">
                {!isConnecting && (
                    <div className="menu_item">
                        <div style={{ marginTop: "5px" }}>
                            <MdPersonalInjury />
                        </div>
                        <div>PATIENT</div>
                    </div>
                )}
                {isConnecting && "Loading..."}
            </button>
            <button onClick={() => onLoginHandler("d")} className="button" type="button">
                {!isConnecting && (
                    <div className="menu_item">
                        <div style={{ marginTop: "5px" }}>
                            <MdPersonAddAlt1 />
                        </div>
                        <div>DOCTOR</div>
                    </div>
                )}
                {isConnecting && "Loading..."}
            </button>
            <button onClick={() => onLoginHandler("h")} className="button" type="button">
                {!isConnecting && (
                    <div className="menu_item">
                        <div style={{ marginTop: "5px" }}>
                            <MdOutlineHomeWork />
                        </div>
                        <div>HOSPITAL ADMIN</div>
                    </div>
                )}
                {isConnecting && "Loading..."}
            </button>
        </div>
    );
};

export default Login;
