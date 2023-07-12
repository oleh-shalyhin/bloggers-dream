import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import usersReducer from './usersSlise';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
