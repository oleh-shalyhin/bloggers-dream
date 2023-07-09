import { Box, Divider, Stack, Typography } from '@mui/material';
import { Comment } from '../../types/types';
import { CommentListItem } from '../';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <Stack>
      <Typography variant="h5" component="h3">
        Comments
      </Typography>
      {comments.map((comment) => (
        <Box key={comment.id}>
          <CommentListItem comment={comment} />
          <Divider />
        </Box>
      ))}
    </Stack>
  );
}
