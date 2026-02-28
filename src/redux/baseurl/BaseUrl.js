import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "https://deliverybackendapp.vercel.app/api/auth";

const Baseurl = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Attach access token
Baseurl.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auto refresh system
Baseurl.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = await AsyncStorage.getItem("refreshToken");

            if (!refreshToken) return Promise.reject(error);

            try {
                const res = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefresh } = res.data;

                await AsyncStorage.setItem("accessToken", accessToken);
                await AsyncStorage.setItem("refreshToken", newRefresh);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return Baseurl(originalRequest);
            } catch (err) {
                await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
            }
        }

        return Promise.reject(error);
    }
);

export default Baseurl;
