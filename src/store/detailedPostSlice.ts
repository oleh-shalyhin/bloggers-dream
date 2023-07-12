import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { DetailedPost, Post, User } from '../types/types';
import { getFullName } from '../utils/utils';
import commentsReducer from './commentsSlice';

interface DetailedPostState {
  data: DetailedPost | null;
}

const initialState: DetailedPostState = {
  data: null,
};

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId: number) => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  return await response.json();
});

export const fetchPostAuthor = createAsyncThunk('posts/fetchPostAuthor', async (userId: number) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  return await response.json();
});

export const detailedPostSlice = createSlice({
  name: 'detailedPost',
  initialState,
  reducers: {
    comments(state, action) {
      if (state.data) {
        state.data.comments = commentsReducer(state.data.comments, action);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.data = {
          ...action.payload,
          userName: 'Unknown Author',
          comments: {
            items: [],
            total: 0,
          },
        };
      })
      .addCase(fetchPostAuthor.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.data) {
          state.data.userName = getFullName(action.payload.firstName, action.payload.lastName);
        }
      });
  },
});

export const selectDetailedPost = (state: RootState) => state.detailedPost;

const detailedPostReducer = detailedPostSlice.reducer;
export default detailedPostReducer;
