import { Grid, Pagination, PaginationItem, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postsLoadingFailedMessage, postsPageSize } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPostIds } from '../../store/slices';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { ErrorMessage, Loader, PostCardListItem } from '../';

export function PostCardList() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const paginationSize = mobile ? 'small' : 'medium';

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [page, setPage] = useState(parseInt(query.get('page') || '1'));

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
    <Grid container spacing={{ xs: 2, sm: 4, md: 6 }}>
      {postIds.map((postId) => (
        <Grid key={postId} item xs={12} md={6}>
          <PostCardListItem postId={postId} />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          size={paginationSize}
          count={getPagesAmount(totalPostsAmount, postsPageSize)}
          page={page}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`/posts${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
          )}
        />
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
