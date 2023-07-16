import PersonIcon from '@mui/icons-material/Person';
import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { commentListItem } from '../../constants/testIds';
import { Comment } from '../../types/types';

interface CommentListItemProps {
  comment: Comment;
}

export function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <Stack data-testid={commentListItem}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon sx={{ color: grey[600] }} />
        <Typography variant="subtitle2">{comment.user.username}</Typography>
      </Box>
      <Typography variant="body1">{comment.body}</Typography>
    </Stack>
  );
}
