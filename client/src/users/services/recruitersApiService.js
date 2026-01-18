import axios from "axios";
import { getToken } from "./localStorageService";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const registerRecruiterUser = async (userDetailsForServer) => {
    try {
        const response = await axios.post(baseUrl + "/recruiters", userDetailsForServer, {
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

export const getAllRecruiters = async () => {
    try {
        const response = await axios.get(`${baseUrl}/recruiters`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getRecruiterById = async (userId) => {
    try {
        const token = getToken()

        const response = await axios.get(`${baseUrl}/recruiters/${userId}`, {headers: {'x-auth-token': token}});
        
        return response;
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editRecruiterProfile = async (userId, userDetailsForServer) => {
    try {
        const token = getToken();
        const response = await axios.put(
            `${baseUrl}/recruiters/${userId}`,
            userDetailsForServer,
            {
                headers: {
                    'x-auth-token': token
                    // Content-Type will be set automatically for FormData
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}