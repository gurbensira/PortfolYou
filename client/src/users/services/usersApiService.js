import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userDetailsForServer) => {
    try {
        const response = await axios.post(baseUrl + "/users", userDetailsForServer, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const login = async (user) => {
    try {
        const response = await axios.post(baseUrl + "/users/login", user);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(baseUrl + "/users");
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(baseUrl + "/users/" + userId);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};