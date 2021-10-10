import { axiosClient } from "../axiosClient";

export const storesApi = {
  getStoresApi({ page, perPage }) {
    const url = '/v1/stores';
    return axiosClient.get(url, {
      params: {page, perPage}
    });
  }
}