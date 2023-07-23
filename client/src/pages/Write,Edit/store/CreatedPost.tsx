import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  content: '',
  memberId: 0,
  categoryId: 0,
  tags: [],
  locationId: 0,
};

export const createdPostSlice = createSlice({
  name: 'createdPost',
  initialState,
  reducers: {
    setCreatedPost: (_state, action) => {
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
    resetCreatedPost: () => initialState,
  },
});

export const store = configureStore({
  reducer: createdPostSlice.reducer,
});

export const { setCreatedPost, resetCreatedPost } = createdPostSlice.actions;
