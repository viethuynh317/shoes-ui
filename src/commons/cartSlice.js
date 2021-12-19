import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../api/commonApi/cartApi';
import { shoesApi } from '../api/commonApi/shoesApi';
import { clearErrorLogin } from '../features/auth/signIn/signInSlice';

export const getAllCarts = createAsyncThunk(
  'fetchAllCarts',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.getAllCartApi(userId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addCart = createAsyncThunk(
  'addCart',
  async ({ userId, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.createCartApi({ userId, data });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  'updateCart',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.updateCartApi(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  'deleteCart',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.deleteCartApi(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  carts: [],
  loading: false,
  actionStatus: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeShoeFilter(state, action) {
      const newState = {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
      return newState;
    },
  },
  extraReducers: {
    [getAllCarts.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getAllCarts.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getAllCarts.fulfilled](state, action) {
      state.loading = false;
      state.carts = action.payload?.cartItems;
      state.actionStatus = { ...action.payload, method: 'get' };
    },
    [addCart.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [addCart.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [addCart.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [updateCart.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateCart.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [updateCart.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [deleteCart.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [deleteCart.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [deleteCart.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
  },
});

const { reducer: cartReducer } = cartSlice;

export default cartReducer;
