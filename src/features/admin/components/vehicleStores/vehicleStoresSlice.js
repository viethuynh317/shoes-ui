import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storesApi } from "../../../../api/adminApi/storesApi";
import { clearErrorLogin } from "../../../auth/signIn/signInSlice";

export const getVehicleStores = createAsyncThunk(
  "getVehicleStores",
  async ({ page, perPage }, { rejectWithValue, dispatch }) => {
    try {
      const res = await storesApi.getStoresApi({ page, perPage });
      dispatch(clearErrorLogin());
      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  storesData: {},
  loading: false,
  errors: {},
};

const vehicleStoresSlice = createSlice({
  name: "vehicleStores",
  initialState,
  reducers: {},
  extraReducers: {
    [getVehicleStores.pending](state) {
      state.loading = true;
    },
    [getVehicleStores.rejected](state, action) {
      state.loading = false;
      state.errors = action.payload;
    },
    [getVehicleStores.fulfilled](state, action) {
      state.loading = false;
      state.storesData = action.payload;
    },
  },
});

const { reducer: vehicleStoresReducer } = vehicleStoresSlice;
export default vehicleStoresReducer;
