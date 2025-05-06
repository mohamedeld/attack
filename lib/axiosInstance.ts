"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { baseUrl } from "./utils";


const axiosInstance= axios.create({
    baseURL:baseUrl,
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = (await cookies())?.get("token")?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;