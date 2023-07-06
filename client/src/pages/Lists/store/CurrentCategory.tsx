import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface ListState {
  currentCategory: string;
}
const initialState: ListState = {
  currentCategory: 'all',
};

export const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      console.log(action.payload);
      state.currentCategory = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: currentCategorySlice.reducer,
});

export const {setCurrentCategory} = currentCategorySlice.actions;
