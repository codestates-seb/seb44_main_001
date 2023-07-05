import { configureStore, createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    region: '',
    district: '',
  },
  reducers: {
    setLocation: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        region: action.payload.region,
        district: action.payload.district,
      };
    },
  },
});

export const store = configureStore({
  reducer: locationSlice.reducer,
});

export const { setLocation } = locationSlice.actions;
