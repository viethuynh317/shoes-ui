import { axiosClientCustomer } from '../axiosClient';

export const wishlistApi = {
  getAllWishlist({ page, perPage }) {
    const url = `/wishlist?page=${page}&perPage=${perPage}`;
    return axiosClientCustomer.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
  updateWishList({ shoeId }) {
    const url = `/wishlist`;
    return axiosClientCustomer.put(
      url,
      { shoeId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
          RoleId: localStorage.getItem('customerRoleId'),
        },
      }
    );
  },
  deleteWishList({ shoeId }) {
    const url = `/wishlist/${shoeId}`;
    return axiosClientCustomer.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        RoleId: localStorage.getItem('customerRoleId'),
      },
    });
  },
};
