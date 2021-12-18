import { axiosClient } from '../axiosClient';

export const profileApi = {
  getProfileById(id) {
    const url = `/profile/userId/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  getRoleId() {
    const url = '/auth/roleId';
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  editProfile({ id, data }) {
    const url = `/profile/userId/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  changePassword({ id, data }) {
    const url = `/auth/change-password/${id}`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  sendCodeToResetPassword(email) {
    const url = '/auth/send-reset-code';
    return axiosClient.post(
      url,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          RoleId: localStorage.getItem('roleId'),
        },
      }
    );
  },
  resetPassword(data) {
    const url = '/auth/new-password';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  getProfileCustomerById() {
    const url = '/profile/userId';
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  getCustomerRoleId() {
    const url = '/auth/roleId';
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  editCustomerProfile(user) {
    const url = '/profile/userId';
    return axiosClient.put(url, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  changePasswordCustomer(password) {
    const url = '/auth/change-password';
    return axiosClient.post(url, password, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
};
