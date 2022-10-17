import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  coords: {},
  recording: false,
  coordsArray: [],
};

export const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    ADD_COORDS: (state, action) => {
      console.log('add_coords');
      return {...state, coords: action.payload};
    },

    START_RECORDING: state => {
      return {...state, recording: true};
    },
    STOP_RECORDING: state => {
      return {...state, coordsArray: [], recording: false};
    },
    UPDATE_COORDS: (state, action) => {
      if (state.recording == true) {
        console.log('update_coords');
        return {
          ...state,
          coords: action.payload,
          coordsArray: [...state.coordsArray, action.payload],
        };
      }
      // if (state.recording == false) {
      //   console.log('inistal');
      //   return {
      //     ...state,
      //     coords: action.payload,
      //   };
      // }
      if (!state.recording) {
        return state;
      }
    },

    // DELETE_USER: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   //   const newstate = state.selectedItems.filter(
    //   //     (item) => item.title != action.payload.title
    //   //   );
    //   state.user = "";
    // },

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {ADD_COORDS, START_RECORDING, STOP_RECORDING, UPDATE_COORDS} =
  coordsSlice.actions;

export default coordsSlice.reducer;
