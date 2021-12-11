import { axiosClient } from '../axiosClient';

export const signInApi = {
  signIn({ email, password }) {
    const signInUrl = '/auth/login';
    return axiosClient.post(signInUrl, { email, password });
  },
};
