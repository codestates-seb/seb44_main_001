import { configureStore, createSlice } from '@reduxjs/toolkit';

export const keywordSice = createSlice({
  name: 'keyword',
  initialState: '',
  reducers: {
    setKeyword: (_state, action) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: keywordSice.reducer,
});

export const { setKeyword } = keywordSice.actions;
