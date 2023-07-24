import { configureStore, createSlice } from '@reduxjs/toolkit';

export const chatInvitationModalSlice = createSlice({
  name: 'chatInvitationModal',
  initialState: false,
  reducers: {
    setChatInvitationModal: (_state, action) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: chatInvitationModalSlice.reducer,
});

export const { setChatInvitationModal } = chatInvitationModalSlice.actions;
