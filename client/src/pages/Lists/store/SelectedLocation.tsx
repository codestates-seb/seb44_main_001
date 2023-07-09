import { configureStore, createSlice } from '@reduxjs/toolkit';

export const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  //유저의 지역으로 바꾸기
  initialState: 4,
  reducers: {
    setSelectedLocation: (_state, action) => {
      return action.payload;
    }
  },
});

export const store = configureStore({
  reducer: selectedLocationSlice.reducer,
});

export const { setSelectedLocation } = selectedLocationSlice.actions;
