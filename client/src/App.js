// https://www.sriramakrishnahospital.com/wp-content/uploads/2021/06/Blood-Donation-1.jpg

/******** Modules ********/
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Web3 from "web3";
import doctorConfig from "./contracts/MedicalChain.json";

/******** Components ********/
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/pages/HomePage";
import CheckRecords from "./components/pages/Patient/CheckRecords";
import Access from "./components/pages/Patient/Access";
import AddDoctor from "./components/pages/Hospital/AddDoctor";
import DoctorDetails from "./components/pages/Hospital/DoctorDetails";
import AddPatient from "./components/pages/Doctor/AddPatient";
import PatientDetails from "./components/pages/Doctor/PatientDetails";

/******** Styles ********/
import "./App.css";
import "./styles/Common.scss";
import "./styles/Navbar.scss";
import "./styles/About.scss";
import "./styles/Login.scss";
import "./styles/ImageArray.scss";
import "./styles/HomePage.scss";

const App = () => {
    const EHR_CONTRACT_ADDRESS = doctorConfig.networks["5777"].address;
    const EHR_CONTRACT_ABI = doctorConfig.abi;
    const [isConnected, setIsConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [ehrContract, setEHRContract] = useState(null);
    const [role, setRole] = useState("");

    const registerDoctor = async (name, spec, addr) => {
        const response = await ehrContract.methods.setDoctorDetails(1, addr, name, spec).send({
            from: currentAccount,
            value: Web3.utils.toWei("0.01"),
            gas: Web3.utils.toHex(800000),
            gasPrice: Web3.utils.toHex(Web3.utils.toWei("10", "gwei")),
        });
        console.log(response);
    };

    const registerPatient = async (details) => {
        const response = await ehrContract.methods
            .setPatientDetails(
                1,
                details.addr,
                details.name,
                details.age,
                details.bloodGrp,
                details.hospitalAddr,
                details.imageArray
            )
            .send({
                from: currentAccount,
                value: Web3.utils.toWei("0.01"),
                gas: Web3.utils.toHex(800000),
                gasPrice: Web3.utils.toHex(Web3.utils.toWei("10", "gwei")),
            });
        console.log(response);
    };

    const getDoctorDetails = async (addr) => {
        const response = await ehrContract.methods.getDoctorDetails(addr).call();
        // console.log(response);
        return response;
    };

    const getPatientDetails = async (addr) => {
        console.log(addr);
        console.log(currentAccount);
        const response = await ehrContract.methods.getPatientDetails(currentAccount, addr).call();
        console.log(response);
        return response;
    };

    const grantDoctorAccess = async (addr) => {
        console.log(addr);
        console.log(currentAccount);
        const response = await ehrContract.methods
            .grantAccessToDoctor(currentAccount, addr, 1)
            .call();
        console.log(response);
        return response;
    };

    const onLogin = async (provider) => {
        const web3 = new Web3(provider);
        // const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8549");
        const account = await web3.eth.getAccounts();
        const ehr_contract = new web3.eth.Contract(EHR_CONTRACT_ABI, EHR_CONTRACT_ADDRESS);
        console.log(account);
        if (account.length === 0) {
            console.log("Please connect to MetaMask!");
        } else if (account[0] !== currentAccount) {
            setCurrentAccount(account[0]);
            setEHRContract(ehr_contract);
            const accBalanceEth = web3.utils.fromWei(
                await web3.eth.getBalance(account[0]),
                "ether"
            );
            console.log(accBalanceEth);
            // setBalance(Number(accBalanceEth).toFixed(6));
            setIsConnected(true);
        }
    };

    return (
        <>
            <Router>
                <header>
                    <Navbar loggedIn={isConnected} account={currentAccount} role={role} />
                </header>
                <main>
                    {!isConnected && <Login onLogin={onLogin} setRole={setRole} />}
                    {isConnected && (
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/admin/add-doctor"
                                element={<AddDoctor registerDoctor={registerDoctor} />}
                            />
                            <Route
                                path="/admin/doctor-records"
                                element={<DoctorDetails getDoctorDetails={getDoctorDetails} />}
                            />
                            <Route
                                path="/doctor/add-patient"
                                element={<AddPatient registerPatient={registerPatient} />}
                            />
                            <Route
                                path="/doctor/patient-records"
                                element={<PatientDetails getPatientDetails={getPatientDetails} />}
                            />
                            <Route
                                path="/patient/records"
                                element={<CheckRecords getPatientDetails={getPatientDetails} />}
                            />
                            <Route
                                path="/patient/access"
                                element={<Access grantDoctorAccess={grantDoctorAccess} />}
                            />
                        </Routes>
                    )}
                </main>
            </Router>
        </>
    );
};

export default App;
