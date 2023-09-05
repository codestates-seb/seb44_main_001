import { configureStore, createSlice } from '@reduxjs/toolkit';

export const totalCommentsSlice = createSlice({
  name: 'totalComments',
  initialState: '',
  reducers: {
    setTotalComments: (_state, action) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: totalCommentsSlice.reducer,
});

export const { setTotalComments } = totalCommentsSlice.actions;
