import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: 0,
  welcomeMsg: '',
  profileImage: '',
  nickname: '',
};

export const fetchMyDataSlice = createSlice({
  name: 'fetchMyData',
  initialState,
  reducers: {
    setMyData: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        location: action.payload.location,
        welcomeMsg: action.payload.welcomeMsg,
        profileImage: action.payload.profileImage,
        nickname: action.payload.nickname,
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
