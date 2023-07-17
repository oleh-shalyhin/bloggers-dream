import { Grid, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postsPageSize } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { pageChanged, selectPosts } from '../../store/slices';
import { getPagesAmount } from '../../utils/utils';
import { PostCardListItem } from '../';

export function PostCardList() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const paginationSize = mobile ? 'small' : 'medium';

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams((prevParams) => {
      const nextSearchParams = new URLSearchParams(prevParams.toString());
      value === 1 ? nextSearchParams.delete('page') : nextSearchParams.set('page', `${value}`);
      return nextSearchParams;
    });
  };

  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1');
    setPage(newPage);
  }, [searchParams]);

  useEffect(() => {
    dispatch(pageChanged(page));
  }, [dispatch, page]);

  return (
    <Stack alignItems="center" sx={{ width: '100%' }}>
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
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
