import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => {
    return localStorage.getItem('my token')
}

export const createJob = async (job) => {
    try {
        const token = getAuthToken()
        const response = await axios.post(`${baseUrl}/jobs`, job, {
            headers: {
                'x-auth-token': token
            }
        })
        return response.data
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message)
        throw error
    }
};

export const getJobByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/jobs/company/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteJob = async (jobId) => {
    try {
        const token = getAuthToken()

        const response = await axios.delete(`${baseUrl}/jobs/${jobId}`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
