import axios, { AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const handleResponse = (response: AxiosResponse) => {
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.message || 'Something went wrong');
    }

    return response.data.data;
};

const get = async (endpoint: string,sessionToken?:string) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
};

const post = async (endpoint: string, data: any) => {
    try {
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, {headers});
        return handleResponse(response);
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
};

export { get, post };
