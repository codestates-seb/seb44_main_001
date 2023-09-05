import { configureStore, createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locationId: 0,
    city: '',
    province: '',
  },
  reducers: {
    setLocation: (_state, action) => {
      return {
        locationId: action.payload.locationId,
        city: action.payload.city,
        province: action.payload.province,
      };
    },
  },
});

export const store = configureStore({
  reducer: locationSlice.reducer,
});

export const { setLocation } = locationSlice.actions;
