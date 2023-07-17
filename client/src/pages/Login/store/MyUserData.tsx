import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberId: 0,
  email: '',
  location: 0,
  welcomeMsg: '',
  profileImage: '',
  nickname: '',
  isMale: true,
  age: 0,
  createdAt: '',
  posts: [],
};

export const myDataSlice = createSlice({
  name: 'myData',
  initialState,
  reducers: {
    setMyData: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        memberId: action.payload.memberId,
        email: action.payload.email,
        location: action.payload.location,
        welcomeMsg: action.payload.welcomeMsg,
        profileImage: action.payload.profileImage,
        nickname: action.payload.nickname,
        isMale: action.payload.isMale,
        age: action.payload.age,
        createdAt: action.payload.createdAt,
        posts: action.payload.posts,
      };
    },
    resetStates: () => {
      return initialState;
    },
  },
});

export const store = configureStore({
  reducer: myDataSlice.reducer,
});

export const { setMyData, resetStates } = myDataSlice.actions;
