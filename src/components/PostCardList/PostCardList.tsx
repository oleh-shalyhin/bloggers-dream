import { Alert, CircularProgress, Grid, Stack } from '@mui/material';
import { PostCard } from '../';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPosts } from '../../store/postsSlice';

export function PostCardList() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Stack alignItems="center" sx={{ width: '100%' }}>
      {posts.status === 'loading' ? (
        <CircularProgress />
      ) : posts.error != null ? (
        <Alert severity="error" sx={{ width: '100%' }}>
          {posts.error}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {posts.items.map((post) => (
            <Grid key={post.id} item xs={12} md={6}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
