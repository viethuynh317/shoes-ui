import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shoesApi } from '../api/commonApi/shoesApi';
import { clearErrorLogin } from '../features/auth/signIn/signInSlice';

export const fetchShoeList = createAsyncThunk(
  'fetchShoeList',
  async (
    { page, perPage, numOfStars, unitPrice, discountOff, search, isConfirmed },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await shoesApi.getShoeList({
        page,
        perPage,
        numOfStars,
        unitPrice,
        discountOff,
        search,
        isConfirmed,
      });
      dispatch(clearErrorLogin());
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchShoeById = createAsyncThunk(
  'fetchShoeById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await shoesApi.getShoeById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addNewShoe = createAsyncThunk(
  'addNewShoe',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await shoesApi.createNewShoe(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateShoeById = createAsyncThunk(
  'updateShoeById',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await shoesApi.updateShoe({ id, data });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteShoeById = createAsyncThunk(
  'deleteShoeById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await shoesApi.deleteShoe(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  shoeData: {},
  shoeById: {},
  filter: {},
  loading: false,
  errors: {},
  status: 200,
  msg: '',
};

const shoesSlice = createSlice({
  name: 'shoes',
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
    [fetchShoeList.pending](state) {
      state.loading = true;
    },
    [fetchShoeList.rejected](state, action) {
      state.loading = false;
      state.errors = action.payload;
    },
    [fetchShoeList.fulfilled](state, action) {
      state.loading = false;
      state.shoeData = action.payload.data;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [fetchShoeById.pending](state) {
      state.loading = true;
    },
    [fetchShoeById.rejected](state, action) {
      state.loading = false;
      state.errors = action.payload;
    },
    [fetchShoeById.fulfilled](state, action) {
      state.loading = false;
      state.shoeById = action.payload.data;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [addNewShoe.pending](state) {
      state.loading = true;
    },
    [addNewShoe.rejected](state, action) {
      state.loading = false;
      state.errors = action.payload;
    },
    [addNewShoe.fulfilled](state, action) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [updateShoeById.pending](state) {
      state.loading = true;
    },
    [updateShoeById.rejected](state, action) {
      state.loading = false;
      state.errors = action.payload;
    },
    [updateShoeById.fulfilled](state, action) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
    [deleteShoeById.pending](state) {
      state.loading = true;
    },
    [deleteShoeById.rejected](state, action) {
      state.loading = false;
      state.errors = action.payload;
    },
    [deleteShoeById.fulfilled](state, action) {
      state.loading = false;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
    },
  },
});

const { reducer: shoesReducer, actions } = shoesSlice;
export const { changeShoeFilter } = actions;

export default shoesReducer;