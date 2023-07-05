import { configureStore, createSlice } from '@reduxjs/toolkit';

export const createdPostSlice = createSlice({
  name: 'createdPost',
  initialState: {
    title: '',
    location: '',
    content: '',
    tags: [],
    category: '',
    memberId: 0,
  },
  reducers: {
    setCreatedPost: (_state, action) => {
      console.log(action.payload); //! 배포 시 삭제
      return {
        title: action.payload.title,
        location: action.payload.location,
        content: action.payload.content,
        tags: action.payload.tags,
        category: action.payload.category,
        memberId: action.payload.memberId,
      };
    },
  },
});

export const store = configureStore({
  reducer: createdPostSlice.reducer,
});

export const { setCreatedPost } = createdPostSlice.actions;
