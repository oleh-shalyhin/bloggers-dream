import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetPostCommentsRequestPayload, GetPostCommentsResponse, PagedComments } from '../types/types';
import { RootState } from './store';

const initialState: PagedComments = {
  items: [],
  total: 0,
};

export const fetchPostComments = createAsyncThunk(
  'posts/fetchPostComments',
  async ({ postId, limit, skip }: GetPostCommentsRequestPayload) => {
    const response = await fetch(`https://dummyjson.com/comments/post/${postId}?limit=${limit}&skip=${skip}`);
    return await response.json();
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPostComments.fulfilled, (state, action: PayloadAction<GetPostCommentsResponse>) => {
      state.items = action.payload.comments;
      state.total = action.payload.total;
    });
  },
});

export const selectPostComments = (state: RootState) => state.detailedPost.data?.comments;

const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
