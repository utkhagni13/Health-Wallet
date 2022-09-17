import { useEffect, useState } from "react";
import { fetchDonors } from "../../../api/requests";
import "../../../styles/dropdown.scss";

const GetBlood = () => {
    const [allDonors, setAllDonors] = useState([]);
    // const [bloodGrp, setBloodGrp] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    const setList = (event) => {
        let bg = event.target.value;
        // setBloodGrp(bg);
        let list = [];
        if (bg === "ALL") {
            list = allDonors;
        } else {
            list = allDonors.filter((donor) => donor.bloodGroup === bg);
        }
        setFilteredList(list);
    };

    useEffect(() => {
        const getAllSites = async () => {
            const res = await fetchDonors();
            console.log("getAllDonors_res:", res);
            if (res.data && res.error === null) {
                console.log(res.data);
                setAllDonors(res.data);
                setFilteredList(res.data);
            }
        };
        getAllSites();
    }, []); //

    return (
        <div>
            <h2>Blood Availability for Emergency Cases</h2>
            <div style={{ margin: "20px auto" }} className="select">
                <select onChange={(e) => setList(e)} id="standard-select">
                    <option value="NA">Select your Blood Group</option>
                    <option value="ALL">ALL</option>
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
            {filteredList.map((donor) => {
                return (
                    <div key={donor.id} className="welcome_flex2">
                        <div className="inside2">
                            <p>NAME: {donor.name}</p>
                            <p>BLOOD-GROUP: {donor.bloodGroup}</p>
                            <p>CONTACT: +91-{donor.phone}</p>
                        </div>
                        <p>Donor's ID: {donor.public_addr}</p>
                        <p>Hospital: {donor.hospital_addr}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default GetBlood;
