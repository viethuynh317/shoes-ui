import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi/authApi';
import { profileApi } from '../../api/profileApi/profileApi';
import { getProfileById } from '../Profile/profileSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.login(data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('roleId', res.roleId);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(getProfileById());
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

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.refreshToken();
      localStorage.setItem('token', res.token);
      return res?.data;
    } catch (error) {
      await dispatch(clearState());
      if (error.response.data.status === 409) {
        dispatch(pushOutLogin());
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendCodeToResetPassword = createAsyncThunk(
  'auth/sendCodeToResetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await profileApi.sendCodeToResetPassword(email);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const res = await profileApi.resetPassword(data);
      // console.log({ res });
      return res?.data;
    } catch (error) {
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

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.user = {};
      state.actionStatus = null;
      localStorage.removeItem('token');
      localStorage.removeItem('roleId');
      localStorage.removeItem('refreshToken');
      return state;
    },
    pushOutLogin: (state) => {
      state.status = 409;
    },
  },
  extraReducers: {
    [loginUser.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [loginUser.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [loginUser.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload;
      state.status = 200;
    },

    [resetPassword.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [resetPassword.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [resetPassword.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [sendCodeToResetPassword.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [sendCodeToResetPassword.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [sendCodeToResetPassword.fulfilled](state, action) {
      state.loading = false;
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

    [refreshToken.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [refreshToken.rejected](state, action) {
      state.loading = false;
      state.actionStatus = null;
    },
    [refreshToken.fulfilled](state, action) {
      state.loading = false;
      state.user.token = action.payload.token;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { clearState, pushOutLogin } = actions;

export default authReducer;
