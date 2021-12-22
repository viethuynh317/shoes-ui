import { axiosClient } from '../axiosClient';
import FormData from 'form-data';
const url = '/shoes';

export const shoesApi = {
  getShoeList({
    page,
    perPage,
    numOfStars,
    unitPrice,
    discountOff,
    search,
    isConfirmed,
    brand,
    gender,
    orderBy,
    rangePrice,
  }) {
    return axiosClient.get(url, {
      params: {
        page,
        perPage,
        numOfStars,
        unitPrice,
        discountOff,
        search,
        isConfirmed,
        brand,
        gender,
        orderBy,
        rangePrice,
      },
    });
  },
  getShoeById(id) {
    return axiosClient.get(`${url}/${id}`);
  },
  createNewShoe(data) {
    const formData = new FormData();
    formData.append('imageUrl', data.imageUrl);
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('typeId', data.typeId);
    formData.append('unitPrice', data.unitPrice);
    formData.append('discountOff', data.discountOff);
    formData.append('discountMaximum', data.discountMaximum);
    formData.append('description', data.description);
    formData.append('isConfirmed', data.isConfirmed);
    return axiosClient.post(url, formData, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    });
  },
  updateShoe({ id, data }) {
    return axiosClient.patch(`${url}/${id}`, data);
  },
  deleteShoe(id) {
    return axiosClient.delete(`${url}/${id}`);
  },
  updateConfirmShoe(id) {
    return axiosClient.patch(`${url}/${id}`);
  },
};
