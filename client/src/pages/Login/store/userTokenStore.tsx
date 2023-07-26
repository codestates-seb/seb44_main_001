import { configureStore, createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setTokenData: (_state, action) => {
      return {
        token: action.payload.token,
      };
    },
  },
});

export const store = configureStore({
  reducer: tokenSlice.reducer,
});

export const { setTokenData } = tokenSlice.actions;
