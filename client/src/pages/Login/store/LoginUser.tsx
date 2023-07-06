import { configureStore, createSlice } from '@reduxjs/toolkit';

export const setLoginSlice = createSlice({
  name: 'signup',
  initialState: {
    email: '',
    password: '',
  },
  reducers: {
    setLoginUser: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        email: action.payload.email,
        password: action.payload.password,
      };
    },
  },
});

export const store = configureStore({
  reducer: setLoginSlice.reducer,
});

export const { setLoginUser } = setLoginSlice.actions;