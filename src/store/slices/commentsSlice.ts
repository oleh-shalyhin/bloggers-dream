import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/client';
import { RootState } from '../store';
import { Comment, GetPostCommentsRequestPayload, GetPostCommentsResponse, RequestStatus } from '../../types/types';

interface CommentsState {
  total: number;
  commentsRequestStatus: RequestStatus;
}

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState<CommentsState>({
  total: 0,
  commentsRequestStatus: {
    status: 'idle',
    error: false,
  },
});

export const fetchPostComments = createAsyncThunk<GetPostCommentsResponse, GetPostCommentsRequestPayload>(
  'comments/fetchPostComments',
  getPostComments,
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.commentsRequestStatus.status = 'loading';
        state.commentsRequestStatus.error = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action: PayloadAction<GetPostCommentsResponse>) => {
        state.commentsRequestStatus.status = 'succeeded';
        state.total = action.payload.total;
        commentsAdapter.setAll(state, action.payload.comments);
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.commentsRequestStatus.status = 'failed';
        state.commentsRequestStatus.error = true;
      });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

export const commentsReducer = commentsSlice.reducer;
