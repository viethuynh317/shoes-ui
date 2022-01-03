import { axiosClientCustomer } from '../axiosClient';
const url = '/carts';

export const cartApi = {
  getAllCartApi({ page, perPage }) {
    return axiosClientCustomer.get(`${url}?page=${page}&perPage=${perPage}`);
  },
  createCartApi({ data }) {
    return axiosClientCustomer.post(`${url}`, data);
  },
  updateCartApi(data) {
    return axiosClientCustomer.patch(`${url}`, data);
  },
  deleteCartApi(data) {
    return axiosClientCustomer.delete(`${url}`, data);
  },
};
