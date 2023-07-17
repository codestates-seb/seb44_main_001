import { configureStore, createSlice } from '@reduxjs/toolkit';

export const chatModalSlice = createSlice({
  name: 'chatModal',
  initialState: false,
  reducers: {
    setChatModal: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: chatModalSlice.reducer,
});

export const { setChatModal } = chatModalSlice.actions;
