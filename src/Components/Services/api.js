import axios from "axios";

export const imgUrl = 'http://13.235.172.209:9000';
const API_BASE_URL = 'http://13.235.172.209:9000/api/v1';
// export const imgUrl = 'http://127.0.0.1:5000';
// const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';
const apiTracker = axios.create({
    baseURL: API_BASE_URL,
});

apiTracker.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function for making GET requests 
export const getData = async (endpoint) => {
    try {
        const response = await apiTracker.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("GET Error:", error);
        throw error;
    }
};

// Function for making POST requests
export const postData = async (endpoint, data) => {
    try {
        const response = await apiTracker.post(endpoint, data);
        // console.log("api",response )
        return response.data;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
};

// Function for making PUT requests
export const putData = async (endpoint, data) => {
    try {
        const response = await apiTracker.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("PUT Error:", error);
        throw error;
    }
};

// Function for making PATCH requests
export const patchData = async (endpoint, data) => {
    try {
        const response = await apiTracker.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("PATCH Error:", error);
        throw error;
    }
};

// Function for making DELETE requests
export const deleteData = async (endpoint) => {
    try {
        const response = await apiTracker.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error("DELETE Error:", error);
        throw error;
    }
};