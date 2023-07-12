import { Alert, CircularProgress, Grid, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { postsPageSize } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPosts } from '../../store/postsSlice';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { PostCard } from '../';

export function PostCardList() {
  const [page, setPage] = useState(1);

  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const skip = getSkipItemsAmount(page, postsPageSize);
    dispatch(fetchPosts({ limit: postsPageSize, skip }));
  }, [page, dispatch]);

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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={getPagesAmount(posts.total, postsPageSize)} page={page} onChange={handlePageChange} />
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}
