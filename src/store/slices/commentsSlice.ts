import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addPostComment, getPostComments } from '../../api/client';
import { commentsPageSize } from '../../constants/constants';
import { RootState } from '../store';
import {
  AddPostCommentRequestPayload,
  Comment,
  GetPostCommentsRequestPayload,
  GetPostCommentsResponse,
  RequestStatus,
} from '../../types/types';

interface CommentsState {
  items: Comment[];
  total: number;
  commentsRequestStatus: RequestStatus;
}

const initialState: CommentsState = {
  items: [],
  total: 0,
  commentsRequestStatus: {
    status: 'idle',
    error: false,
  },
};

export const fetchPostComments = createAsyncThunk<GetPostCommentsResponse, GetPostCommentsRequestPayload>(
  'comments/fetchPostComments',
  getPostComments,
);

export const addNewComment = createAsyncThunk<Comment, AddPostCommentRequestPayload>(
  'comments/addNewComment',
  addPostComment,
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
        state.items = action.payload.comments;
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.commentsRequestStatus.status = 'failed';
        state.commentsRequestStatus.error = true;
      })
      .addCase(addNewComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.total += 1;
        state.items = [action.payload, ...state.items].slice(0, commentsPageSize);
      });
  },
});

export const selectComments = (state: RootState) => state.comments;

export const commentsReducer = commentsSlice.reducer;
