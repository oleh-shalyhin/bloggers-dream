import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetPostsResponse, GetPostsRequestPayload, RequestStatus, Post } from '../types/types';

interface PostsState {
  total: number;
  postsRequestStatus: RequestStatus;
  singlePostRequestStatus: RequestStatus;
}

const postsAdapter = createEntityAdapter<Post>();

const initialState = postsAdapter.getInitialState<PostsState>({
  total: 0,
  postsRequestStatus: {
    status: 'idle',
    error: null,
  },
  singlePostRequestStatus: {
    status: 'idle',
    error: null,
  },
});

export const fetchPosts = createAsyncThunk<GetPostsResponse, GetPostsRequestPayload>(
  'posts/fetchPosts',
  async ({ limit, skip }) => {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
    return await response.json();
  },
);

export const fetchSinglePost = createAsyncThunk<Post, number>('posts/fetchSinglePost', async (postId) => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  return await response.json();
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postDetailsClosed(state) {
      state.singlePostRequestStatus.status = 'idle';
      state.singlePostRequestStatus.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsRequestStatus.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<GetPostsResponse>) => {
        state.postsRequestStatus.status = 'succeeded';
        state.total = action.payload.total;
        postsAdapter.setAll(state, action.payload.posts);
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsRequestStatus.status = 'failed';
        state.postsRequestStatus.error = 'Failed to load posts';
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.singlePostRequestStatus.status = 'loading';
      })
      .addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.singlePostRequestStatus.status = 'succeeded';
        postsAdapter.setOne(state, action.payload);
      })
      .addCase(fetchSinglePost.rejected, (state) => {
        state.singlePostRequestStatus.status = 'failed';
        state.singlePostRequestStatus.error = 'Failed to load post';
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const { postDetailsClosed } = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
