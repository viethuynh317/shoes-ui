import axios from 'axios';
import { getLocalStorageToken } from '../services/tokenConfig';

export const axiosClient = axios.create({
  baseURL: 'https://v-shoes-api.herokuapp.com/api/v1',
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

export const axiosClientCustomer = axios.create({
  baseURL: 'https://v-shoes-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
    RoleId: localStorage.getItem('customerRoleId'),
  },
});

axiosClientCustomer.interceptors.request.use(async (config) => {
  config['Authorization'] = `Bearer ${localStorage.getItem('customerToken')}`;
  config['RoleId'] = localStorage.getItem('customerRoleId');
  return config;
});

axiosClientCustomer.interceptors.response.use((res) => {
  return res;
});
