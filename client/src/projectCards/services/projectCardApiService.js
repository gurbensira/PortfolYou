import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => {
    return localStorage.getItem('my token')
}

export const createCard = async (formData) => {
    try {
        const token = getAuthToken()
        const response = await axios.post(`${baseUrl}/projectCards`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': token
            }
        })
        return response.data
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message)
        throw error
    }
};

export const getCardsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/projectCards/users/${userId}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCard = async (cardId) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(`${baseUrl}/projectCards/${cardId}`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateCard = async (cardId, formData) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(`${baseUrl}/projectCards/${cardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};