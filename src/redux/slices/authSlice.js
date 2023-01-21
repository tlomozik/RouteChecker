import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ADD_USER: (state, action) => {
      return {...state, user: action.payload};
    },

    DELETE_USER: state => {
      state.user = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {ADD_USER, DELETE_USER} = authSlice.actions;

export default authSlice.reducer;
