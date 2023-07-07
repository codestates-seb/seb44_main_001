import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Member } from '../../../common/type';

type UserState = {
  member: Member | null;
};

const initialUserState: UserState = {
  member: null,
};

export const memberSlice = createSlice({
  name: 'member',
  initialState: initialUserState,
  reducers: {
    setMember: (state, action) => {
      state.member = action.payload;
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: {
    user: memberSlice.reducer,
  },
});

export const {setMember} = memberSlice.actions;