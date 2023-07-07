import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface LocationState {
  selectedLocation: string;
}
//유저의 지역으로 바꾸기
const initialState: LocationState = {
  selectedLocation: '광진구',
};

export const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: selectedLocationSlice.reducer,
});

export const { setSelectedLocation } = selectedLocationSlice.actions;
