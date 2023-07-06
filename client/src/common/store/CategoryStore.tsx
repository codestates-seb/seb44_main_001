import { configureStore, createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: '',
  reducers: {
    setCategory: (_state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: categorySlice.reducer,
});

export const { setCategory } = categorySlice.actions;
