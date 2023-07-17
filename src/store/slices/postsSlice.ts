import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts, getSinglePost, searchPostsByText } from '../../api/client';
import { postsPageSize } from '../../constants/constants';
import { RootState } from '../store';
import { GetPostsResponse, Post, RequestStatus } from '../../types/types';
import { getSkipItemsAmount } from '../../utils/utils';

interface PostsState {
  items: Post[];
  total: number;
  searchText: string;
  page: number;
  postsRequestStatus: RequestStatus;
  singlePostRequestStatus: RequestStatus;
}

const initialState: PostsState = {
  items: [],
  total: 0,
  searchText: '',
  page: 1,
  postsRequestStatus: 'idle',
  singlePostRequestStatus: 'idle',
};

export const fetchPosts = createAsyncThunk<GetPostsResponse, undefined>('posts/fetchPosts', (_, { getState }) => {
  const state = getState() as RootState;
  const { page, searchText } = state.posts;
  const skip = getSkipItemsAmount(page, postsPageSize);
  const payload = { limit: postsPageSize, skip };
  return searchText ? searchPostsByText({ ...payload, q: searchText }) : getPosts(payload);
});
export const fetchSinglePost = createAsyncThunk<Post, number>('posts/fetchSinglePost', getSinglePost);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    searchTextChanged(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    pageChanged(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    postDetailsClosed(state) {
      state.singlePostRequestStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsRequestStatus = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<GetPostsResponse>) => {
        state.postsRequestStatus = 'succeeded';
        state.total = action.payload.total;
        state.items = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsRequestStatus = 'failed';
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.singlePostRequestStatus = 'loading';
      })
      .addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.singlePostRequestStatus = 'succeeded';
        const postIndex = state.items.findIndex((item) => item.id === action.payload.id);
        if (postIndex !== -1) {
          state.items[postIndex] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchSinglePost.rejected, (state) => {
        state.singlePostRequestStatus = 'failed';
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, id: number | undefined) =>
  state.posts.items.find((post) => post.id === id);

export const { pageChanged, postDetailsClosed, searchTextChanged } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
