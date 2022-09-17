import axios from "./config";

export const createDonor = async (donorData) => {
    const url = "/createdonor";
    const body = {
        public_addr: donorData.details._paId,
        name: donorData.details._paName,
        bloodGroup: donorData.details._paBloodGroup,
        hospital_addr: donorData.details._hospital,
        last_donated: "Donating First Time",
        phone: donorData.mobile,
        email: donorData.email,
    };
    console.log(body);
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};

export const fetchDonors = async () => {
    const url = "/fetchalldonors";
    const body = {};
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};
