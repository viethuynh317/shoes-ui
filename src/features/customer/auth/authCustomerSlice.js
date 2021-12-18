import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi/authApi';
import { profileApi } from '../../../api/profileApi/profileApi';

export const registerCustomer = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.registerCustomer(data);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRoleId = createAsyncThunk(
  'auth/getRoleId',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.getRoleId();
      return res?.data;
    } catch (error) {
      // if (
      //   error.response.data.status === 401 &&
      //   error.response.data.msg === 'Token expired' &&
      //   localStorage.getItem('refreshToken')
      // ) {
      //   await dispatch(refreshToken());
      //   dispatch(getRoleId());
      // }
      // if (error.response.data.status === 409) {
      //   dispatch(pushOutLogin());
      // }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: {},
  actionStatus: null,
  loading: false,
  status: 200,
};

const authCustomerSlice = createSlice({
  name: 'authCustomer',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [registerCustomer.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [registerCustomer.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [registerCustomer.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload;
      state.actionStatus = action.payload;
    },

    [getRoleId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getRoleId.rejected](state, action) {
      state.loading = false;
      state.actionStatus = null;
    },
    [getRoleId.fulfilled](state, action) {
      state.loading = false;
      state.user.roleId = action.payload.roleId;
    },
  },
});

const { reducer: authCustomerReducer } = authCustomerSlice;

export default authCustomerReducer;
