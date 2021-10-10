import axios from "axios";
import { getLocalStorageToken } from "../services/tokenConfig";

export const axiosClient = axios.create({
  baseURL: 'http://178.128.56.76:3003/api/',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config['Authorization'] = `Bearer ${getLocalStorageToken()}`;
  return config;
});

axiosClient.interceptors.response.use((res) => {
  return res;
});
