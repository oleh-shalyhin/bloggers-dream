import { Box, Divider, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentsPageSize } from '../../constants/constants';
import { fetchPostComments, selectDetailedPostComments } from '../../store/detailedPostSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { CommentListItem } from '../';

export function CommentList() {
  const [page, setPage] = useState(1);

  const { postId } = useParams();
  const comments = useAppSelector(selectDetailedPostComments);
  const dispatch = useAppDispatch();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (!postId) {
      return;
    }

    const skip = getSkipItemsAmount(page, commentsPageSize);
    dispatch(fetchPostComments({ postId: +postId, limit: commentsPageSize, skip }));
  }, [postId, page, dispatch]);

  return (
    <Stack>
      <Typography variant="h5" component="h3">
        Comments
      </Typography>
      {comments ? (
        <Stack>
          {comments.items.map((comment) => (
            <Box key={comment.id}>
              <CommentListItem comment={comment} />
              <Divider />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={getPagesAmount(comments.total, commentsPageSize)}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Stack>
      ) : null}
    </Stack>
  );
}
