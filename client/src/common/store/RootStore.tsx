import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { locationSlice } from './LocationStore';
import { createdPostSlice } from '../../pages/Write/store/CreatedPost';
import { currentCategorySlice } from '../../pages/Lists/store/CurrentCategory';
import { setSignupSlice } from '../../pages/Signup/store/SignupUser';
import { categorySlice } from './CategoryStore';
import { setLoginSlice } from '../../pages/Login/store/LoginUser';


const rootReducer = combineReducers({
  location: locationSlice.reducer,
  createdPost: createdPostSlice.reducer,
  signup: setSignupSlice.reducer,
  login: setLoginSlice.reducer,
  currentCategory : currentCategorySlice.reducer,
  category: categorySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
