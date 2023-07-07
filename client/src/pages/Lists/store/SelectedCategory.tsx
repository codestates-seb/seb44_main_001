import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface CategoryState {
  selectedCategory: string;
}
const initialState: CategoryState = {
  selectedCategory: 'all',
};

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: selectedCategorySlice.reducer,
});

export const {setSelectedCategory} = selectedCategorySlice.actions;
