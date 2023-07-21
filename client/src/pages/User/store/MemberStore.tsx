import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberId: 0,
  email: '',
  location: {
    city: '',
    province: '',
    locationId: 0,
  },
  welcomeMsg: '',
  profileImage: '',
  nickname: '',
  isMale: true,
  age: 0,
  createdAt: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setUserData: (_state, action) => {
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
      };
    },
    resetViewProfile: () => {
      return initialState;
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: memberSlice.reducer,
});

export const { setUserData, resetViewProfile } = memberSlice.actions;
