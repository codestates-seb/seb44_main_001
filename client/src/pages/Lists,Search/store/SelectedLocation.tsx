import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationId: 1,
  city: '서울특별시',
  province: '전체',
};

export const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  //유저의 지역으로 바꾸기
  initialState,
  reducers: {
    setSelectedLocation: (_state, action) => {
      const payload = action.payload;
      return {
        locationId: payload.locationId,
        city: payload.city,
        province: payload.province,
      };
    },
  },
});

export const store = configureStore({
  reducer: selectedLocationSlice.reducer,
});

export const { setSelectedLocation } = selectedLocationSlice.actions;
