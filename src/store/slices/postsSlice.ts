import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts, getSinglePost } from '../../api/client';
import { RootState } from '../store';
import { GetPostsResponse, GetPostsRequestPayload, RequestStatus, Post } from '../../types/types';

interface PostsState {
  items: Post[];
  total: number;
  postsRequestStatus: RequestStatus;
  singlePostRequestStatus: RequestStatus;
}

const initialState: PostsState = {
  items: [],
  total: 0,
  postsRequestStatus: {
    status: 'idle',
    error: false,
  },
  singlePostRequestStatus: {
    status: 'idle',
    error: false,
  },
};

export const fetchPosts = createAsyncThunk<GetPostsResponse, GetPostsRequestPayload>('posts/fetchPosts', getPosts);
export const fetchSinglePost = createAsyncThunk<Post, number>('posts/fetchSinglePost', getSinglePost);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postDetailsClosed(state) {
      state.singlePostRequestStatus.status = 'idle';
      state.singlePostRequestStatus.error = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsRequestStatus.status = 'loading';
        state.postsRequestStatus.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<GetPostsResponse>) => {
        state.postsRequestStatus.status = 'succeeded';
        state.total = action.payload.total;
        state.items = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsRequestStatus.status = 'failed';
        state.postsRequestStatus.error = true;
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.singlePostRequestStatus.status = 'loading';
        state.singlePostRequestStatus.error = false;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.singlePostRequestStatus.status = 'succeeded';
        const postIndex = state.items.findIndex((item) => item.id === action.payload.id);
        if (postIndex !== -1) {
          state.items[postIndex] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchSinglePost.rejected, (state) => {
        state.singlePostRequestStatus.status = 'failed';
        state.singlePostRequestStatus.error = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, id: number | undefined) =>
  state.posts.items.find((post) => post.id === id);

export const { postDetailsClosed } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
