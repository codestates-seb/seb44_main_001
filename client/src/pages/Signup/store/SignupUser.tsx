import { configureStore, createSlice } from '@reduxjs/toolkit';

export const setSignupSlice = createSlice({
  name: 'signup',
  initialState: {
    email: '',
    password: '',
    nickname: '',
    age: 0,
    isMale: true,
    locationId: null,
    welcomeMsg: '',
  },
  reducers: {
    setSignupUser: (_state, action) => {
      return {
        email: action.payload.email,
        password: action.payload.password,
        nickname: action.payload.nickname,
        age: action.payload.age,
        isMale: action.payload.isMale,
        locationId: action.payload.locationId,
        welcomeMsg: action.payload.welcomeMsg,
      };
    },
  },
});

export const store = configureStore({
  reducer: setSignupSlice.reducer,
});

export const { setSignupUser } = setSignupSlice.actions;
