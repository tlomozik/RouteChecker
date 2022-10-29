import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ADD_USER: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      return {...state, user: action.payload};
    },

    DELETE_USER: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   const newstate = state.selectedItems.filter(
      //     (item) => item.title != action.payload.title
      //   );
      state.user = '';
    },

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {ADD_USER, DELETE_USER} = authSlice.actions;

export default authSlice.reducer;
