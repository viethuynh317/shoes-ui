import { axiosClient } from "../axiosClient";

const url = "/shoes";

export const shoesApi = {
  getShoeList({ page, perPage, numOfStars, unitPrice, discountOff }) {
    return axiosClient.get(url, {
      params: { page, perPage, numOfStars, unitPrice, discountOff },
    });
  },
  getShoeById(id) {
    return axiosClient.get(`${url}/${id}`);
  },
  createNewShoe(data) {
    return axiosClient.post(url, {
      data,
    });
  },
  updateShoe({ id, data }) {
    return axiosClient.patch(`${url}/${id}`, {
      data,
    });
  },
  deleteShoe(id) {
    return axiosClient.delete(`${url}/${id}`);
  },
};
