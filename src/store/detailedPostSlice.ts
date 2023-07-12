import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, DetailedPost, Post, RequestStatus, User } from '../types/types';
import { RootState } from './store';
import { getFullName } from '../utils/utils';

interface DetailedPostState {
  data: DetailedPost | null;
}

const initialState: DetailedPostState = {
  data: null,
};

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId: number) => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const data = await response.json();
  return data;
});

export const fetchPostAuthor = createAsyncThunk('posts/fetchPostAuthor', async (userId: number) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  const data = await response.json();
  return data;
});

export const detailedPostSlice = createSlice({
  name: 'detailedPost',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.data = {
          ...action.payload,
          userName: 'Unknown Author',
          comments: [] as Comment[],
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
