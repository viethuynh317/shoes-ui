import axios from 'axios';
import { getLocalStorageToken } from '../services/tokenConfig';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config['Authorization'] = `Bearer ${getLocalStorageToken()}`;
  return config;
});

axiosClient.interceptors.response.use((res) => {
  return res;
});
