import { axiosClient } from '../axiosClient';

export const shopApi = {
  createNewFeedback({ shoeId, content, numOfStars }) {
    const url = '/feedbacks';
    return axiosClient.post(
      url,
      {
        shoeId,
        content,
        numOfStars,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
          RoleId: localStorage.getItem('customerRoleId'),
        },
      }
    );
  },
  getAllFeedback(id) {
    const url = `/feedbacks/${id}`;
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
};
