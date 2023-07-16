import { Grid, Pagination, PaginationItem, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postsLoadingFailedMessage, postsPageSize } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPosts } from '../../store/slices';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { ErrorMessage, Loader, PostCardListItem } from '../';

export function PostCardList() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const paginationSize = mobile ? 'small' : 'medium';

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [page, setPage] = useState(parseInt(query.get('page') || '1'));

  const posts = useAppSelector(selectPosts);
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
      {posts.items.map((post) => (
        <Grid key={post.id} item xs={12} md={6}>
          <PostCardListItem post={post} />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          size={paginationSize}
          count={getPagesAmount(posts.total, postsPageSize)}
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
    const { postsRequestStatus: status } = posts;

    if (status === 'loading') {
      content = <Loader />;
    } else if (status === 'succeeded') {
      content = renderPostCardItems();
    } else if (status === 'failed') {
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
