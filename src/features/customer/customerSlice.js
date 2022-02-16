import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkoutApi } from '../../api/customerApi/checkoutApi';
import { shopApi } from '../../api/customerApi/shopApi';
import { wishlistApi } from '../../api/customerApi/wishlistApi';

export const createFeedback = createAsyncThunk(
  'createFeedback',
  async ({ shoeId, content, numOfStars }, { rejectWithValue }) => {
    try {
      const res = await shopApi.createNewFeedback({
        shoeId,
        content,
        numOfStars,
      });
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedbacks = createAsyncThunk(
  'getFeedbacks',
  async ({ id, page, perPage }, { rejectWithValue }) => {
    try {
      const res = await shopApi.getAllFeedback({ id, page, perPage });
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllWishlist = createAsyncThunk(
  'getAllWishlist',
  async ({ page, perPage }, { rejectWithValue }) => {
    try {
      const res = await wishlistApi.getAllWishlist({ page, perPage });
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateWishlist = createAsyncThunk(
  'updateWishlist',
  async ({ shoeId }, { rejectWithValue }) => {
    try {
      const res = await wishlistApi.updateWishList({ shoeId });
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  'deleteWishlist',
  async ({ shoeId }, { rejectWithValue }) => {
    try {
      const res = await wishlistApi.deleteWishList({ shoeId });
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const purchaseOrder = createAsyncThunk(
  'purchaseOrder',
  async (data, { rejectWithValue }) => {
    try {
      const res = await checkoutApi.purchaseOrder(data);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderByOrderId = createAsyncThunk(
  'getOrderByOrderId',
  async (id, { rejectWithValue }) => {
    try {
      const res = await checkoutApi.getOrderByOrderId(id);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderByUserId = createAsyncThunk(
  'getOrderByUserId',
  async (_, { rejectWithValue }) => {
    try {
      const res = await checkoutApi.getOrderByUserId();
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  actionStatus: null,
  loading: false,
  feedbacks: [],
  wishlists: [],
  orders: {},
  purchasedOrders: [],
};

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    clearActionStatus(state) {
      state.actionStatus = null;
    },
  },
  extraReducers: {
    [createFeedback.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [createFeedback.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [createFeedback.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getFeedbacks.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getFeedbacks.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getFeedbacks.fulfilled](state, action) {
      state.loading = true;
      state.feedbacks = action.payload?.feedbacks;
    },
    [getAllWishlist.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getAllWishlist.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getAllWishlist.fulfilled](state, action) {
      state.loading = true;
      state.feedbacks = action.payload?.wishlist;
    },
    [updateWishlist.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateWishlist.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [updateWishlist.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [deleteWishlist.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [deleteWishlist.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [deleteWishlist.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [purchaseOrder.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [purchaseOrder.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [purchaseOrder.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getOrderByOrderId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getOrderByOrderId.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getOrderByOrderId.fulfilled](state, action) {
      state.loading = true;
      state.orders = action.payload;
    },
    [getOrderByUserId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getOrderByUserId.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getOrderByUserId.fulfilled](state, action) {
      state.loading = true;
      state.purchasedOrders = action.payload.orders;
    },
  },
});

const { reducer: customerReducer, actions } = customerSlice;
export default customerReducer;
export const { clearActionStatus } = actions;
