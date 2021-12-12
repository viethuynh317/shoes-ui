import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { profileApi } from '../../api/profileApi/profileApi';
// import { pushOutLogin, refreshToken } from '../Auth/authSlice';

export const getProfileById = createAsyncThunk(
  'profile/getProfileById',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.getProfileById();
      return res?.data;
    } catch (error) {
      // if (
      //   error.response.data.status === 401 &&
      //   error.response.data.msg === 'Token expired' &&
      //   localStorage.getItem('refreshToken')
      // ) {
      //   await dispatch(refreshToken());
      //   dispatch(getProfileById());
      // }
      // if (error.response.data.status === 409) {
      //   dispatch(pushOutLogin());
      // }
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.editProfile(data);
      dispatch(getProfileById());
      return res?.data;
    } catch (error) {
      // if (
      //   error.response.data.status === 401 &&
      //   error.response.data.msg === 'Token expired' &&
      //   localStorage.getItem('refreshToken')
      // ) {
      //   await dispatch(refreshToken());
      //   dispatch(editProfile(data));
      // }
      // if (error.response.data.status === 409) {
      //   dispatch(pushOutLogin());
      // }
      // dispatch(getProfileById());
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.changePassword(data);
      return res?.data;
    } catch (error) {
      // if (
      //   error.response.data.status === 401 &&
      //   error.response.data.msg === 'Token expired' &&
      //   localStorage.getItem('refreshToken')
      // ) {
      //   await dispatch(refreshToken());
      //   dispatch(changePassword(data));
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
  loading: false,
  actionStatus: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [getProfileById.pending](state) {
      state.actionStatus = null;
      state.loading = true;
      state.user = {};
    },
    [getProfileById.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [getProfileById.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload;
    },

    [editProfile.pending](state) {
      state.actionStatus = null;
      state.loading = true;
      state.user = {};
    },
    [editProfile.rejected](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },
    [editProfile.fulfilled](state, action) {
      state.loading = false;
      state.actionStatus = action.payload;
    },

    [changePassword.pending](state) {
      // state.actionStatus = null;
      state.loading = true;
    },
    [changePassword.rejected](state, action) {
      state.loading = false;
      // state.actionStatus = action.payload;
    },
    [changePassword.fulfilled](state, action) {
      state.loading = false;
      // state.actionStatus = action.payload;
    },
  },
});

const { actions, reducer: profileReducer } = profileSlice;

export const { clearState } = actions;

export default profileReducer;
