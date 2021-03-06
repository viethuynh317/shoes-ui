import { axiosClientCustomer } from '../axiosClient';
const url = '/carts';

export const cartApi = {
  getAllCartApi({ page, perPage }) {
    return axiosClientCustomer.get(`${url}?page=${page}&perPage=${perPage}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  createCartApi({ data }) {
    return axiosClientCustomer.post(`${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  updateCartApi(data) {
    return axiosClientCustomer.put(`${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  deleteCartApi(id) {
    return axiosClientCustomer.delete(`${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
};
