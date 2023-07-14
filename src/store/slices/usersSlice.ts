import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../api/client';
import { RootState } from '../store';
import { User } from '../../types/types';

const usersAdapter = createEntityAdapter<User>();

export const fetchPostAuthor = createAsyncThunk<User, number>('users/fetchPostAuthor', getUser);

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPostAuthor.fulfilled, usersAdapter.setOne);
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state: RootState) => state.users,
);

export const usersReducer = usersSlice.reducer;
