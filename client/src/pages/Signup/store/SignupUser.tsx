import { configureStore, createSlice } from '@reduxjs/toolkit';

export const setSignupSlice = createSlice({
  name: 'signup',
  initialState: {
    email: '',
    password: '',
    nickname: '',
    age: 0,
    isMale: true,
    location: null,
    welcomeMsg: '',
  },
  reducers: {
    setSignupUser: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        email: action.payload.email,
        password: action.payload.password,
        nickname: action.payload.nickname,
        age: action.payload.age,
        isMale: action.payload.isMale,
        location: action.payload.location,
        welcomeMsg: action.payload.welcomeMsg,
      };
    },
  },
});

export const store = configureStore({
  reducer: setSignupSlice.reducer,
});

export const { setSignupUser } = setSignupSlice.actions;
