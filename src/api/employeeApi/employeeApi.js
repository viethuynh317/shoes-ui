import { axiosClient } from '../axiosClient';

const employeeApi = {
  getListOrderByStatusId(id) {
    const url = `/orders/statuses/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  updateOrder(id, data) {
    const url = `/orders/${id}/statuses`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  cancelOrder(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          localStorage.getItem('token') || localStorage.getItem('customerToken')
        }`,
      },
    });
  },

  getAllShippers() {
    const url = `/shippers`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  createNewShipper(data) {
    const url = `/shippers`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  updateInfoShipper(id, data) {
    const url = `/shippers/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  deleteShipper(id) {
    const url = `/shippers/${id}`;
    return axiosClient.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getAllFeedbacks(id) {
    const url = `/feedbacks/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  addFeedback(data) {
    const url = '/feedbacks';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  addReplyFeedback(data) {
    const url = '/feedbacks/reply';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },

  getFeedbackById(id) {
    const url = `/feedbacks/reply/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
};

export default employeeApi;
