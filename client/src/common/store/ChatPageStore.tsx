import { configureStore, createSlice } from '@reduxjs/toolkit';

export const chatPageSlice = createSlice({
  name: 'chatPage',
  initialState: 0,
  reducers: {
    setChatPage: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: chatPageSlice.reducer,
});

export const { setChatPage } = chatPageSlice.actions;
