import { axiosClient } from '../axiosClient';

const authApi = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  refreshToken() {
    const url = '/auth/token';
    return axiosClient.post(
      url,
      { refreshToken: localStorage.getItem('refreshToken') },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
export default authApi;
