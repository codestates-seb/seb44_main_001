import { configureStore, createSlice } from '@reduxjs/toolkit';

export const chatRoomInfoSlice = createSlice({
  name: 'chatRoomInfo',
  initialState: {
    roomName: '',
    roomId: 0,
    // roomType: '',
  },
  reducers: {
    setChatRoomInfo: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        roomName: action.payload.roomName,
        roomId: action.payload.roomId,
        // roomType: action.payload.roomType,
      };
    },
  },
});

export const store = configureStore({
  reducer: chatRoomInfoSlice.reducer,
});

export const { setChatRoomInfo } = chatRoomInfoSlice.actions;
