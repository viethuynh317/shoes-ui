import { axiosClient } from '../axiosClient';
const url = '/carts';

export const cartApi = {
  getAllCartApi(userId) {
    return axiosClient.get(`${url}/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  createCartApi({ userId, data }) {
    return axiosClient.post(`${url}/${userId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  updateCartApi(data) {
    return axiosClient.patch(`${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  deleteCartApi(data) {
    return axiosClient.delete(`${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
};
