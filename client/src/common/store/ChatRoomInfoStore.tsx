import { configureStore, createSlice } from '@reduxjs/toolkit';

export const chatRoomInfoSlice = createSlice({
  name: 'chatRoomInfo',
  initialState: {
    roomName: '',
    roomId: 0,
  },
  reducers: {
    setChatRoomInfo: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        roomName: action.payload.roomName,
        roomId: action.payload.roomId,
      };
    },
  },
});

export const store = configureStore({
  reducer: chatRoomInfoSlice.reducer,
});

export const { setChatRoomInfo } = chatRoomInfoSlice.actions;
