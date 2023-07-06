import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface ListState {
  category: string;
}
const initialState: ListState = {
  category: 'all',
};

export const filteredListSlice = createSlice({
  name: 'filteredList',
  initialState,
  reducers: {
    setFilteredList: (state, action) => {
      console.log(action.payload);
      state.category = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: filteredListSlice.reducer,
});

export const {setFilteredList} = filteredListSlice.actions;
