import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 1,
  name: '전체',
};

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState: initialState,
  reducers: {
    setSelectedCategory: (_state, action) => {
      const payload = action.payload;
      return {
        categoryId: payload.categoryId,
        name: payload.name,
      };
    },
  },
});

export const store = configureStore({
  reducer: selectedCategorySlice.reducer,
});

export const { setSelectedCategory } = selectedCategorySlice.actions;
