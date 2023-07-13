import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Member } from '../../../common/type';

interface MemberState {
  data?: Member;
}

const initialState: MemberState = {};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    getMember: (_state, action) => {
      return {
        data: action.payload,
      };
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: memberSlice.reducer,
});

export const { getMember } = memberSlice.actions;
