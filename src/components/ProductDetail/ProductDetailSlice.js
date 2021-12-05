import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../../api/productApi';
import { pushOutLogin, refreshToken } from '../../../features/Auth/authSlice';

export const getProductDetail = createAsyncThunk(
  'products/getFoodById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await productApi.getFoodById(id);
      return res;
    } catch (error) {
      if (
        error.response.data.status === 401 &&
        error.response.data.msg === 'Token expired' &&
        localStorage.getItem('refreshToken')
      ) {
        await dispatch(refreshToken());
        dispatch(getProductDetail(id));
      }
      if (error.response.data.status === 409) {
        dispatch(pushOutLogin());
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: {
    status: 200,
  },
};

const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getProductDetail.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
      state.data.status = action.payload.status;
    },
    [getProductDetail.fulfilled](state, action) {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

const { reducer: productDetailReducer } = productDetailSlice;

export default productDetailReducer;
