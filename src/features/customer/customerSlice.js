import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shopApi } from '../../api/customerApi/shopApi';

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
  async (id, { rejectWithValue }) => {
    try {
      const res = await shopApi.getAllFeedback(id);
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
};

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {},
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
  },
});

const { reducer: customerReducer } = customerSlice;
export default customerReducer;
