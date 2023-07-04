import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { locationFilterSlice } from './LocationFilterStore';

const rootReducer = combineReducers({
  locationFilter: locationFilterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
