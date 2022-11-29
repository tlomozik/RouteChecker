import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accelArray: [],
};

export const accelSlice = createSlice({
  name: 'accel',
  initialState,
  reducers: {
    ADD_ACCEL_RECORDS: (state, action) => {
      return {
        ...state,
        accelArray: [...state.accelArray, action.payload],
      };
    },
    WIPE_ACCEL_RECORDS: state => {
      return {...state, accelArray: []};
    },
  },
});

// Action creators are generated for each case reducer function
export const {ADD_ACCEL_RECORDS, WIPE_ACCEL_RECORDS} = accelSlice.actions;

export default accelSlice.reducer;
