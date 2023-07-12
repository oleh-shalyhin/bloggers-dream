import { Box, Divider, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { commentsPageSize } from '../../constants/constants';
import { fetchPostComments, selectCommentIds } from '../../store/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { CommentListItem } from '../';

interface CommentsListProps {
  postId: number;
}

export function CommentList({ postId }: CommentsListProps) {
  const [page, setPage] = useState(1);

  const commentIds = useAppSelector(selectCommentIds);
  const commentsTotalAmount = useAppSelector((state) => state.comments.total);
  const dispatch = useAppDispatch();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const skip = getSkipItemsAmount(page, commentsPageSize);
    dispatch(fetchPostComments({ postId, limit: commentsPageSize, skip }));
  }, [postId, page, dispatch]);

  return (
    <Stack>
      <Typography variant="h5" component="h3">
        Comments
      </Typography>
      <Stack>
        {commentIds.map((commentId) => (
          <Box key={commentId}>
            <CommentListItem commentId={commentId} />
            <Divider />
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={getPagesAmount(commentsTotalAmount, commentsPageSize)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
