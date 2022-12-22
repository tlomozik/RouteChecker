import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  coords: {},
  recording: false,
  coordsArray: [],
  roadGaps: [],
};

export const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    ADD_COORDS: (state, action) => {
      console.log('add_coords');
      return {...state, coords: {...action.payload}};
    },

    ADD_ROAD_GAP: (state, action) => {
      return {...state, roadGaps: [...state.roadGaps, action.payload]};
    },

    WIPE_ROADGAPS: state => {
      return {...state, roadGaps: []};
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
  ADD_ROAD_GAP,
  WIPE_ROADGAPS,
} = coordsSlice.actions;

export default coordsSlice.reducer;
