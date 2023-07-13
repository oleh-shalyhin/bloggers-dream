import { Alert, Box, CircularProgress, Divider, Pagination, Stack, Typography } from '@mui/material';
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
  const { status: commentsRequestStatus, error: commentsRequestError } = useAppSelector(
    (store) => store.comments.commentsRequestStatus,
  );
  const dispatch = useAppDispatch();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const skip = getSkipItemsAmount(page, commentsPageSize);
    dispatch(fetchPostComments({ postId, limit: commentsPageSize, skip }));
  }, [postId, page, dispatch]);

  const renderLoader = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );

  const renderPostComments = () => (
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
  );

  const renderErrorMessage = () => (
    <Alert severity="error" sx={{ width: '100%' }}>
      {commentsRequestError}
    </Alert>
  );

  const renderContent = () => {
    let content = null;

    if (commentsRequestStatus === 'loading') {
      content = renderLoader();
    } else if (commentsRequestStatus === 'succeeded') {
      content = renderPostComments();
    } else if (commentsRequestStatus === 'failed' && commentsRequestError != null) {
      content = renderErrorMessage();
    }

    return content;
  };

  return (
    <Stack>
      <Typography variant="h5" component="h3">
        Comments
      </Typography>
      {renderContent()}
    </Stack>
  );
}
