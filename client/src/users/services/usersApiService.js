import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userDetailsForServer) => {
    try {
        const response = await axios.post(baseUrl + "/users", userDetailsForServer);
        return response;
    } catch (error) {
        console.log(error);
    }
};

// TODO! --> login function
export const login = async (user) => {
    try {
        const response = await axios.post(baseUrl + "/users/login", user);
        return response;
    } catch (error) {
        console.log(error);
    }
};