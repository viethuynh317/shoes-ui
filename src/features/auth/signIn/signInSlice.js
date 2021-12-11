import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInApi } from '../../../api/authApi/signInApi';
import { setLocalStorageToken } from '../../../services/tokenConfig';

export const getTokenSignIn = createAsyncThunk(
  'getTokenSignIn',
  async ({ data: { email, password } }, { rejectWithValue }) => {
    try {
      const res = await signInApi.signIn({ email, password });
      setLocalStorageToken(res?.data?.token);
      localStorage.setItem('roleId', res?.data?.roleId);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  dataLogin: {},
  loading: false,
  actionStatus: null,
};

const signInSlice = createSlice({
  name: 'singIn',
  initialState,
  reducers: {
    clearErrorLogin: (state) => {
      state.actionStatus = {};
    },
  },
  extraReducers: {
    [getTokenSignIn.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getTokenSignIn.rejected](state, action) {
      state.actionStatus = action.payload;
      state.loading = false;
    },
    [getTokenSignIn.fulfilled](state, action) {
      state.dataLogin = action.payload;
      state.loading = false;
      state.actionStatus = action.payload;
    },
  },
});

const { reducer: signInReducer, actions } = signInSlice;

export const { clearErrorLogin } = actions;
export default signInReducer;
