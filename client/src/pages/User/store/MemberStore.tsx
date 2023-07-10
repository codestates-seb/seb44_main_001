import { configureStore, createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    age: 0,
    comments: [],
    createdAt: '',
    email: '',
    isMale: true,
    location: 0,
    memberId: 0,
    nickname: '',
    posts: [],
    profileImage: '',
    welcomeMsg: '',
  },
  reducers: {
    getMember: (_state, action) => {
      return {
        age: action.payload.age,
        comments: action.payload.comments,
        createdAt: action.payload.createdAt,
        email: action.payload.email,
        isMale: action.payload.isMale,
        location: action.payload.location,
        memberId: action.payload.memberId,
        nickname: action.payload.nickname,
        posts: action.payload.posts,
        profileImage: action.payload.profileImage,
        welcomeMsg: action.payload.welcomeMsg,
      }
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: memberSlice.reducer,
});

export const {getMember} = memberSlice.actions;