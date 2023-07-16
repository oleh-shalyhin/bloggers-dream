import { Box, Divider, Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { commentsPageSize, postCommentsLoadingFailedMessage } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPostComments, selectComments } from '../../store/slices';
import { getPagesAmount, getSkipItemsAmount } from '../../utils/utils';
import { AddComment, CommentListItem, ErrorMessage, Loader } from '../';

interface CommentsListProps {
  postId: number;
}

export function CommentList({ postId }: CommentsListProps) {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const paginationSize = mobile ? 'small' : 'medium';
  const titleVariant = tablet ? 'h6' : 'h5';

  const [page, setPage] = useState(1);

  const comments = useAppSelector(selectComments);
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
        {comments.items.map((comment) => (
          <Stack key={comment.id} spacing={1}>
            <CommentListItem comment={comment} />
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          size={paginationSize}
          count={getPagesAmount(comments.total, commentsPageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Stack>
  );

  const renderContent = () => {
    let content = null;
    const { commentsRequestStatus: status } = comments;

    if (status === 'loading') {
      content = <Loader />;
    } else if (status === 'succeeded') {
      content = renderPostComments();
    } else if (status === 'failed') {
      content = <ErrorMessage message={postCommentsLoadingFailedMessage} />;
    }

    return content;
  };

  return (
    <Stack spacing={1}>
      <Typography variant={titleVariant} component="h3" sx={{ mb: 1 }}>
        Comments
      </Typography>
      <AddComment postId={postId} />
      {renderContent()}
    </Stack>
  );
}
