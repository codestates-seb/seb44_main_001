import { configureStore, createSlice } from '@reduxjs/toolkit';

export const setLoginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    setLoginUser: (_state, action) => {
      return {
        username: action.payload.username,
        password: action.payload.password,
      };
    },
  },
});

export const store = configureStore({
  reducer: setLoginSlice.reducer,
});

export const { setLoginUser } = setLoginSlice.actions;
