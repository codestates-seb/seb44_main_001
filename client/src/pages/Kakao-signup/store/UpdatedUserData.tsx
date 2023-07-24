import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationId: 0,
  welcomeMsg: '',
  nickname: '',
  isMale: true,
  age: 0,
};

export const updatedUserSlice = createSlice({
  name: 'patchUser',
  initialState,
  reducers: {
    setUpdatedUser: (_state, action) => {
      return {
        locationId: action.payload.location,
        welcomeMsg: action.payload.welcomeMsg,
        nickname: action.payload.nickname,
        isMale: action.payload.isMale,
        age: action.payload.age,
      };
    },
    resetStates: () => {
      return initialState;
    },
  },
});

export const store = configureStore({
  reducer: updatedUserSlice.reducer,
});

export const { setUpdatedUser } = updatedUserSlice.actions;
