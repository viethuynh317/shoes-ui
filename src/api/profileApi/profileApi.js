import { axiosClient } from '../axiosClient';

export const profileApi = {
  getProfileById() {
    const url = '/profile/userId';
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
  editProfile(user) {
    const url = '/profile/userId';
    return axiosClient.put(url, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        RoleId: localStorage.getItem('roleId'),
      },
    });
  },
  changePassword(password) {
    const url = '/auth/change-password';
    return axiosClient.post(url, password, {
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
};
