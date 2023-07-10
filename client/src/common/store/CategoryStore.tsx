import { configureStore, createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryId: 0,
    name: '',
  },
  reducers: {
    setCategory: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        categoryId: action.payload.categoryId,
        name: action.payload.name,
      };
    },
  },
});

export const store = configureStore({
  reducer: categorySlice.reducer,
});

export const { setCategory } = categorySlice.actions;
