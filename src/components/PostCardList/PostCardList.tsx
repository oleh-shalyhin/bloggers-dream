import { Alert, CircularProgress, Grid, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { postsPageSize } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPostIds } from '../../store/postsSlice';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { PostCard } from '../';

export function PostCardList() {
  const [page, setPage] = useState(1);

  const postIds = useAppSelector(selectPostIds);
  const requestStatus = useAppSelector((store) => store.posts.status);
  const requestError = useAppSelector((store) => store.posts.error);
  const totalPostsAmount = useAppSelector((store) => store.posts.total);
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
      {requestStatus === 'loading' ? (
        <CircularProgress />
      ) : requestError != null ? (
        <Alert severity="error" sx={{ width: '100%' }}>
          {requestError}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {postIds.map((postId) => (
            <Grid key={postId} item xs={12} md={6}>
              <PostCard postId={postId} />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={getPagesAmount(totalPostsAmount, postsPageSize)}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}
