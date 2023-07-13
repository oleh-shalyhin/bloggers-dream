import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Comment, GetPostCommentsRequestPayload, GetPostCommentsResponse, RequestStatus } from '../types/types';
import { postCommentsLoadingFailedMessage } from '../constants/constants';

interface CommentsState {
  total: number;
  commentsRequestStatus: RequestStatus;
}

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState<CommentsState>({
  total: 0,
  commentsRequestStatus: {
    status: 'idle',
    error: null,
  },
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
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.commentsRequestStatus.status = 'loading';
        state.commentsRequestStatus.error = null;
      })
      .addCase(fetchPostComments.fulfilled, (state, action: PayloadAction<GetPostCommentsResponse>) => {
        state.commentsRequestStatus.status = 'succeeded';
        state.total = action.payload.total;
        commentsAdapter.setAll(state, action.payload.comments);
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.commentsRequestStatus.status = 'failed';
        state.commentsRequestStatus.error = postCommentsLoadingFailedMessage;
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
