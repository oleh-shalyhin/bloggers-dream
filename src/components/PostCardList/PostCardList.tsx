import { Grid } from '@mui/material';
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
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} md={6}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
