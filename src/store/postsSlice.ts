import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetPostsResponse, PageSelector, Post, RequestStatus } from '../types/types';

interface PostsState {
  items: Post[];
  total: number;
  status: RequestStatus;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ limit, skip }: PageSelector) => {
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  const data = await response.json();
  return data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<GetPostsResponse>) => {
        state.status = 'succeeded';
        state.items = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to load posts';
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

const postsReducer = postsSlice.reducer;

export default postsReducer;
