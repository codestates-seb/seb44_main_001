import { configureStore, createSlice } from '@reduxjs/toolkit';

export const locationFilterSlice = createSlice({
  name: 'locationFilter',
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
  reducer: locationFilterSlice.reducer,
});

export const { setLocation } = locationFilterSlice.actions;
