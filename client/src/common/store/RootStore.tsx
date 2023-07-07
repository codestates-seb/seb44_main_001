import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './CategoryStore';
import { locationSlice } from './LocationStore';
import { selectedCategorySlice } from '../../pages/Lists/store/SelectedCategory';
import { selectedLocationSlice } from '../../pages/Lists/store/SelectedLocation';
import { createdPostSlice } from '../../pages/Write,Edit/store/CreatedPost';
import { setSignupSlice } from '../../pages/Signup/store/SignupUser';
import { categorySlice } from './CategoryStore';
import { setLoginSlice } from '../../pages/Login/store/LoginUser';

const rootReducer = combineReducers({
  category: categorySlice.reducer,
  location: locationSlice.reducer,
  selectedCategory: selectedCategorySlice.reducer,
  selectedLocation: selectedLocationSlice.reducer,
  createdPost: createdPostSlice.reducer,
  signup: setSignupSlice.reducer,
  login: setLoginSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
