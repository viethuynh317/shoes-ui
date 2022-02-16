import { axiosClientCustomer } from '../axiosClient';

export const checkoutApi = {
  purchaseOrder(data) {
    const url = `/orders/purchase`;
    return axiosClientCustomer.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  getOrderByOrderId(id) {
    const url = `/orders/${id}`;
    return axiosClientCustomer.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  getOrderByUserId() {
    const url = `/orders`;
    return axiosClientCustomer.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
};
