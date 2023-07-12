import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Comment, GetPostCommentsRequestPayload, GetPostCommentsResponse } from '../types/types';

interface CommentsState {
  total: number;
}

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState<CommentsState>({
  total: 0,
});

export const fetchPostComments = createAsyncThunk<GetPostCommentsResponse, GetPostCommentsRequestPayload>(
  'comments/fetchPostComments',
  async ({ postId, limit, skip }) => {
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
      state.total = action.payload.total;
      commentsAdapter.setAll(state, action.payload.comments);
    });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
