import { configureStore, createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    member: {},
  },
  reducers: {
    getMember: (_state, action) => {
      return {
        member: action.payload
      }
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: memberSlice.reducer,
});

export const {getMember} = memberSlice.actions;