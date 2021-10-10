import { createSlice } from "@reduxjs/toolkit";

const dashBoardSlice = createSlice({
  name: "dashBoard",
  initialState: {
    open: true,
  },
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
      return state;
    },
  },
});

const { actions, reducer: dashBoardReducer } = dashBoardSlice;

export const { setOpen } = actions;
export default dashBoardReducer;
