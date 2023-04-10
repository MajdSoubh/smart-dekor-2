import axios from "axios";
import { toast } from "react-toastify";
const http = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(null, (err) => {
    const expectedError =
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500;
    const unauthorized = err.response && err.response.status === 401;
    if (unauthorized) {
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.reload();
    }
    if (!expectedError) {
        toast.error("An unexpected error occurred");
    }

    return Promise.reject(err);
});
export default http;
