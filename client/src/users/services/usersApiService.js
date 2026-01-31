import axios from "axios";
import { getToken } from "./localStorageService";
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
        throw error;
    }
};

export const getAllUsers = async (page = 1, limit = 20) => {
    try {
        const response = await axios.get(`${baseUrl}/users?page=${page}&limit=${limit}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const token = getToken()

        const response = await axios.get(`${baseUrl}/users/${userId}`, {headers: {'x-auth-token': token}});
        
        return response;
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const toggleFollowUser = async (userId) => {
    try {
        const token = getToken()
        const response = await axios.patch(`${baseUrl}/users/follow/${userId}`, {}, {
            headers: {
                'x-auth-token': token
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

export const editUserProfile = async (userId, userDetailsForServer) => {
    try {
        const token = getToken();
        const response = await axios.put(
            `${baseUrl}/users/${userId}`,
            userDetailsForServer,
            {
                headers: {
                    'x-auth-token': token
                   
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}