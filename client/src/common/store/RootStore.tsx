import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { locationSlice } from './LocationStore';
import { createdPostSlice } from '../../pages/Write/store/CreatedPost';
import { currentCategorySlice } from '../../pages/Lists/store/CurrentCategory';
import { setSignupSlice } from '../../pages/Signup/store/createSignupUser';
import { categorySlice } from './CategoryStore';

const rootReducer = combineReducers({
  location: locationSlice.reducer,
  createdPost: createdPostSlice.reducer,
  signup: setSignupSlice.reducer,
  currentCategory: currentCategorySlice.reducer,
  category: categorySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
