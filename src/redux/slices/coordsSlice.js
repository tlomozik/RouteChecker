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
      return {...state, coords: {...action.payload}};
    },

    WIPE_COORDS: state => {
      return {...state, coordsArray: []};
    },

    START_RECORDING: state => {
      return {...state, recording: true};
    },
    STOP_RECORDING: state => {
      return {...state, recording: false};
    },
    UPDATE_COORDS: (state, action) => {
      if (state.recording == true) {
        console.log('update_coords');
        return {
          ...state,
          coords: {...action.payload},
          coordsArray: [...state.coordsArray, action.payload],
        };
      }

      if (!state.recording) {
        return state;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ADD_COORDS,
  START_RECORDING,
  STOP_RECORDING,
  UPDATE_COORDS,
  WIPE_COORDS,
} = coordsSlice.actions;

export default coordsSlice.reducer;
