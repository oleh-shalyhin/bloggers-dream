import { configureStore } from '@reduxjs/toolkit';
import { commentsReducer, usersReducer, postsReducer } from './slices';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
