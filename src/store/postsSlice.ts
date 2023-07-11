import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post, RequestStatus } from '../types/types';
import { RootState } from './store';

interface PostsState {
  items: Post[];
  status: RequestStatus;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://dummyjson.com/posts');
  const data = await response.json();
  return data.posts;
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
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
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
