import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../api/commonApi/cartApi';
import { wishlistApi } from '../api/customerApi/wishlistApi';

export const getAllCarts = createAsyncThunk(
  'getAllCarts',
  async ({ page, perPage }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.getAllCartApi({ page, perPage });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addCart = createAsyncThunk(
  'addCart',
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.createCartApi({ data });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addCartAndDelete = createAsyncThunk(
  'addCart',
  async ({ data, shoeId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.createCartApi({ data });
      await wishlistApi.deleteWishList({ shoeId });
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
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await cartApi.deleteCartApi(id);
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
    clearActionStatusCart(state) {
      state.actionStatus = null;
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
    [addCartAndDelete.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [addCartAndDelete.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [addCartAndDelete.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;

export default cartReducer;
export const { clearActionStatusCart } = actions;
