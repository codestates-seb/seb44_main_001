import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './CategoryStore';
import { locationSlice } from './LocationStore';
import { selectedCategorySlice } from '../../pages/Lists,Search/store/SelectedCategory';
import { selectedLocationSlice } from '../../pages/Lists,Search/store/SelectedLocation';
import { createdPostSlice } from '../../pages/Write,Edit/store/CreatedPost';
import { setSignupSlice } from '../../pages/Signup/store/SignupUser';
import { setLoginSlice } from '../../pages/Login/store/LoginUser';
import { totalCommentsSlice } from './CommentPageStore';
import { chatModalSlice } from './ChatModalStore';
import { updatedUserSlice } from '../../pages/Oauth-Signup/store/UpdatedUserData';
import { chatRoomInfoSlice } from './ChatRoomInfoStore';
import { chatInvitationModalSlice } from '../components/Chat/store/ChatInvitationModal';

const rootReducer = combineReducers({
  category: categorySlice.reducer,
  location: locationSlice.reducer,
  selectedCategory: selectedCategorySlice.reducer,
  selectedLocation: selectedLocationSlice.reducer,
  createdPost: createdPostSlice.reducer,
  signup: setSignupSlice.reducer,
  login: setLoginSlice.reducer,
  authSignup: updatedUserSlice.reducer,
  totalComments: totalCommentsSlice.reducer,
  chatRoomInfo: chatRoomInfoSlice.reducer,
  chatModal: chatModalSlice.reducer,
  chatInvitationModal: chatInvitationModalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
