import { configureStore, createSlice } from '@reduxjs/toolkit';

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  //전체 카테고리로 바꾸기
  initialState: 0,
  reducers: {
    setSelectedCategory: (_state, action) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: selectedCategorySlice.reducer,
});

export const {setSelectedCategory} = selectedCategorySlice.actions;
