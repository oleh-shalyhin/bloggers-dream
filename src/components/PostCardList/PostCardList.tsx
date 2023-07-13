import { Grid, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { postsLoadingFailedMessage, postsPageSize } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPostIds } from '../../store/postsSlice';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { ErrorMessage, Loader, PostCard } from '../';

export function PostCardList() {
  const [page, setPage] = useState(1);

  const postIds = useAppSelector(selectPostIds);
  const { status: postsRequestStatus, error: postsRequestError } = useAppSelector(
    (store) => store.posts.postsRequestStatus,
  );
  const totalPostsAmount = useAppSelector((store) => store.posts.total);
  const dispatch = useAppDispatch();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const skip = getSkipItemsAmount(page, postsPageSize);
    dispatch(fetchPosts({ limit: postsPageSize, skip }));
  }, [page, dispatch]);

  const renderPostCardItems = () => (
    <Grid container spacing={6}>
      {postIds.map((postId) => (
        <Grid key={postId} item xs={12} md={6}>
          <PostCard postId={postId} />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={getPagesAmount(totalPostsAmount, postsPageSize)} page={page} onChange={handlePageChange} />
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    let content = null;

    if (postsRequestStatus === 'loading') {
      content = <Loader />;
    } else if (postsRequestStatus === 'succeeded') {
      content = renderPostCardItems();
    } else if (postsRequestStatus === 'failed' && postsRequestError) {
      content = <ErrorMessage message={postsLoadingFailedMessage} />;
    }

    return content;
  };

  return (
    <Stack alignItems="center" sx={{ width: '100%' }}>
      {renderContent()}
    </Stack>
  );
}
