import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  content: '',
  memberId: 2,
  categoryId: 0,
  tags: [],
  locationId: 0,
};

export const createdPostSlice = createSlice({
  name: 'createdPost',
  initialState,
  reducers: {
    setCreatedPost: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        title: action.payload.title,
        content: action.payload.content,
        memberId: action.payload.memberId,
        categoryId: action.payload.categoryId,
        tags: action.payload.tags,
        locationId: action.payload.locationId,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetCreatedPost: (_state) => initialState,
  },
});

export const store = configureStore({
  reducer: createdPostSlice.reducer,
});

export const { setCreatedPost, resetCreatedPost } = createdPostSlice.actions;
