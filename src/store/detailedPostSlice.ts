import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { DetailedPost, GetPostCommentsRequestPayload, GetPostCommentsResponse, Post, User } from '../types/types';
import { getFullName } from '../utils/utils';

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

export const fetchPostComments = createAsyncThunk(
  'posts/fetchPostComments',
  async ({ postId, limit, skip }: GetPostCommentsRequestPayload) => {
    const response = await fetch(`https://dummyjson.com/comments/post/${postId}?limit=${limit}&skip=${skip}`);
    return await response.json();
  },
);

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
      })
      .addCase(fetchPostComments.fulfilled, (state, action: PayloadAction<GetPostCommentsResponse>) => {
        if (state.data) {
          state.data.comments = {
            items: action.payload.comments,
            total: action.payload.total,
          };
        }
      });
  },
});

export const selectDetailedPost = (state: RootState) => state.detailedPost;

const detailedPostReducer = detailedPostSlice.reducer;
export default detailedPostReducer;
