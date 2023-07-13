import { Box, Divider, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { commentsPageSize, postCommentsLoadingFailedMessage } from '../../constants/constants';
import { fetchPostComments, selectCommentIds } from '../../store/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { CommentListItem, ErrorMessage, Loader } from '../';

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

  const renderPostComments = () => (
    <Stack spacing={2}>
      <Stack spacing={1}>
        {commentIds.map((commentId) => (
          <Stack key={commentId} spacing={1}>
            <CommentListItem commentId={commentId} />
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={getPagesAmount(commentsTotalAmount, commentsPageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Stack>
  );

  const renderContent = () => {
    let content = null;

    if (commentsRequestStatus === 'loading') {
      content = <Loader />;
    } else if (commentsRequestStatus === 'succeeded') {
      content = renderPostComments();
    } else if (commentsRequestStatus === 'failed' && commentsRequestError) {
      content = <ErrorMessage message={postCommentsLoadingFailedMessage} />;
    }

    return content;
  };

  return (
    <Stack>
      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
        Comments
      </Typography>
      {renderContent()}
    </Stack>
  );
}
