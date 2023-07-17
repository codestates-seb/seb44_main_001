import { configureStore, createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
    memberId: 0,
  },
  reducers: {
    setTokenData: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        token: action.payload.token,
        memberId: action.payload.memberId,
      };
    },
  },
});

export const store = configureStore({
  reducer: tokenSlice.reducer,
});

export const { setTokenData } = tokenSlice.actions;
