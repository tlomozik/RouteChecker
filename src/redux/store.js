import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import coordsReducer from '../redux/slices/coordsSlice';
import accelReducer from '../redux/slices/accelSlice';
export const store = configureStore({
  reducer: {
    user: authReducer,
    coords: coordsReducer,
    accel: accelReducer,
  },
});
