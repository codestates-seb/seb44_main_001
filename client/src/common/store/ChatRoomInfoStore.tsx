import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomName: '',
  roomId: 0,
  roomType: '',
  memberCount: 0,
  unreadCount: 0,
  lastMessage: '',
  lastSentTime: '',
  lastCheckedTime: '',
};

export const chatRoomInfoSlice = createSlice({
  name: 'chatRoomInfo',
  initialState: initialState,
  reducers: {
    setChatRoomInfo: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        roomName: action.payload.roomName,
        roomId: action.payload.roomId,
        roomType: action.payload.roomType,
        memberCount: action.payload.memberCount,
        unreadCount: action.payload.unreadCount,
        lastMessage: action.payload.lastMessage,
        lastSentTime: action.payload.lastSentTime,
        lastCheckedTime: action.payload.lastCheckedTime,
      };
    },
    resetChatRoomInfo: () => initialState,
  },
});

export const store = configureStore({
  reducer: chatRoomInfoSlice.reducer,
});

export const { setChatRoomInfo, resetChatRoomInfo } = chatRoomInfoSlice.actions;
