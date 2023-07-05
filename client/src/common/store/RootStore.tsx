import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { locationSlice } from './LocationStore';
import { createdPostSlice } from '../../pages/Write/store/CreatedPost';

const rootReducer = combineReducers({
  location: locationSlice.reducer,
  createdPost: createdPostSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
