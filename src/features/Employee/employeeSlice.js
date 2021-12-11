import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employeeApi from '../../api/employeeApi/employeeApi';
// import { pushOutLogin, refreshToken } from './auth/authSlice';

export const getOrdersByStatusId = createAsyncThunk(
  'employee/getOrdersByStatusId',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.getListOrderByStatusId(id);
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(getOrdersByStatusId(id));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'employee/updateOrderStatus',
  async ({ id, data, statusId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.updateOrder(id, data);
      dispatch(getOrdersByStatusId(statusId));
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(updateOrderStatus({ id, data, statusId }));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllShippers = createAsyncThunk(
  'employee/getAllShippers',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.getAllShippers();
      return res?.data?.shippers;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(getAllShippers());
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewShipper = createAsyncThunk(
  'employee/createNewShipper',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.createNewShipper(data);
      dispatch(getAllShippers());
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(createNewShipper(data));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShipper = createAsyncThunk(
  'employee/deleteShipper',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.deleteShipper(id);
      dispatch(getAllShippers());
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(deleteShipper(id));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInfoShipper = createAsyncThunk(
  'employee/updateInfoShipper',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.updateInfoShipper(id, data);
      dispatch(getAllShippers());
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(updateInfoShipper({ id, data }));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFeedbacks = createAsyncThunk(
  'employee/getAllFeedbacks',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.getAllFeedbacks(id);
      return res?.data?.feedbacks;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(getAllFeedbacks(id));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFeedback = createAsyncThunk(
  'employee/addFeedback',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.addFeedback(data);
      dispatch(getAllFeedbacks());
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(addFeedback(data));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReplyFeedback = createAsyncThunk(
  'employee/addReplyFeedback',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.addReplyFeedback(data);
      return res?.data;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(addReplyFeedback(data));
      //   }
      //   if (error.response.data.status === 409) {
      //     dispatch(pushOutLogin());
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedbackByIdSlice = createAsyncThunk(
  'employee/getFeedbackByIdSlice',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await employeeApi.getFeedbackById(id);
      return res?.data?.feeback;
    } catch (error) {
      //   if (
      //     error.response.data.status === 401 &&
      //     error.response.data.msg === 'Token expired' &&
      //     localStorage.getItem('refreshToken')
      //   ) {
      //     await dispatch(refreshToken());
      //     dispatch(getFeedbackByIdSlice(id));
      //   }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  orders: [],
  shippers: [],
  feedbacks: [],
  shippersInOrder: [],
  replyFeedbacks: {},
  loading: false,
  actionStatus: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearActionStatus(state) {
      state.actionStatus = null;
    },
    setReplyFeedbacks(state, action) {
      state.replyFeedbacks = action.payload;
    },
  },
  extraReducers: {
    [getOrdersByStatusId.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getOrdersByStatusId.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getOrdersByStatusId.fulfilled](state, action) {
      state.loading = true;
      state.orders = action.payload.orders;
      state.shippersInOrder = action.payload.shippers;
    },

    [updateOrderStatus.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateOrderStatus.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [updateOrderStatus.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [getAllShippers.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getAllShippers.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getAllShippers.fulfilled](state, action) {
      state.loading = true;
      state.shippers = action.payload;
    },

    [updateInfoShipper.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [updateInfoShipper.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [updateInfoShipper.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [createNewShipper.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [createNewShipper.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [createNewShipper.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [deleteShipper.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [deleteShipper.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [deleteShipper.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [getAllFeedbacks.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getAllFeedbacks.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getAllFeedbacks.fulfilled](state, action) {
      state.loading = true;
      state.feedbacks = action.payload;
    },

    [addFeedback.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [addFeedback.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [addFeedback.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [addReplyFeedback.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [addReplyFeedback.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [addReplyFeedback.fulfilled](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },

    [getFeedbackByIdSlice.pending](state) {
      state.actionStatus = null;
      state.loading = true;
    },
    [getFeedbackByIdSlice.rejected](state, action) {
      state.loading = true;
      state.actionStatus = action.payload;
    },
    [getFeedbackByIdSlice.fulfilled](state, action) {
      state.loading = true;
      state.replyFeedbacks = action.payload;
    },
  },
});

const { actions, reducer: employeeReducer } = employeeSlice;

export const { clearActionStatus, setReplyFeedbacks } = actions;

export default employeeReducer;
