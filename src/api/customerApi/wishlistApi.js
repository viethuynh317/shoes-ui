import { axiosClientCustomer } from '../axiosClient';

export const wishlistApi = {
  getAllWishlist({ page, perPage }) {
    const url = `/wishlist?page=${page}&perPage=${perPage}`;
    return axiosClientCustomer.get(url);
  },
  updateWishList({ shoeId }) {
    const url = `/wishlist`;
    return axiosClientCustomer.put(url, { shoeId });
  },
  deleteWishList({ shoeId }) {
    const url = `/wishlist/${shoeId}`;
    return axiosClientCustomer.delete(url);
  },
};
