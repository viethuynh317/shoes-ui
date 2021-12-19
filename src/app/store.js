import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../commons/cartSlice';
import shoesReducer from '../commons/shoesSlice';
import dashBoardReducer from '../components/dashBoardSlice';
import adminReducer from '../features/admin/adminSlice';
import vehicleStoresReducer from '../features/admin/components/vehicleStores/vehicleStoresSlice';
import authReducer from '../features/auth/authSlice';
import signInReducer from '../features/auth/signIn/signInSlice';
import authCustomerReducer from '../features/customer/auth/authCustomerSlice';
import employeeReducer from '../features/Employee/employeeSlice';
import profileReducer from '../features/Profile/profileSlice';

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    dashboard: dashBoardReducer,
    vehicleStores: vehicleStoresReducer,
    shoes: shoesReducer,
    admin: adminReducer,
    employee: employeeReducer,
    profile: profileReducer,
    auth: authReducer,
    authCustomer: authCustomerReducer,
    cart: cartReducer,
  },
});
