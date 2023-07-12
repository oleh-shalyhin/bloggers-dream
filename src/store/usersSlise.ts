import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from '../types/types';

const usersAdapter = createEntityAdapter<User>();

export const fetchPostAuthor = createAsyncThunk<User, number>('users/fetchPostAuthor', async (userId) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  return await response.json();
});

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

const usersReducer = usersSlice.reducer;
export default usersReducer;
