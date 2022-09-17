import axios from "axios";

const instance = axios.create({
    // .. where we make our configurations
    baseURL: "http://localhost:80/",
    withCredentials: true,
});

export default instance;
