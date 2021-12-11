import { configureStore } from '@reduxjs/toolkit';
import shoesReducer from '../commons/shoesSlice';
import dashBoardReducer from '../components/dashBoardSlice';
import adminReducer from '../features/admin/adminSlice';
import vehicleStoresReducer from '../features/admin/components/vehicleStores/vehicleStoresSlice';
import signInReducer from '../features/auth/signIn/signInSlice';
import employeeReducer from '../features/Employee/employeeSlice';

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    dashboard: dashBoardReducer,
    vehicleStores: vehicleStoresReducer,
    shoes: shoesReducer,
    admin: adminReducer,
    employee: employeeReducer,
  },
});
