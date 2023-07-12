import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetPostsResponse, GetPostsRequestPayload, RequestStatus, Post } from '../types/types';

interface PostsState {
  total: number;
  status: RequestStatus;
  error: string | null;
}

const postsAdapter = createEntityAdapter<Post>();

const initialState = postsAdapter.getInitialState<PostsState>({
  total: 0,
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ limit, skip }: GetPostsRequestPayload) => {
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  return await response.json();
});

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId: number) => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  return await response.json();
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
        state.total = action.payload.total;
        postsAdapter.setAll(state, action.payload.posts);
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to load posts';
      })
      .addCase(fetchSinglePost.fulfilled, postsAdapter.setOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

const postsReducer = postsSlice.reducer;
export default postsReducer;
