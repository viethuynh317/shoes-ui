import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInApi } from "../../../api/authApi/signInApi";
import { setLocalStorageToken } from "../../../services/tokenConfig";

export const getTokenSignIn = createAsyncThunk(
  "getTokenSignIn",
  async ({ data: { email, password } }, { rejectWithValue }) => {
    try {
      const res = await signInApi.signIn({ email, password });
      setLocalStorageToken(res?.data.token);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  dataLogin: {},
  loading: false,
  error: {},
};

const signInSlice = createSlice({
  name: "singIn",
  initialState,
  reducers: {
    clearErrorLogin: (state) => {
      state.error = {};
    },
  },
  extraReducers: {
    [getTokenSignIn.pending](state) {
      state.loading = true;
    },
    [getTokenSignIn.rejected](state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    [getTokenSignIn.fulfilled](state, action) {
      state.dataLogin = action.payload;
      state.error = {};
      state.loading = false;
    },
  },
});

const { reducer: signInReducer, actions } = signInSlice;

export const { clearErrorLogin } = actions;
export default signInReducer;
