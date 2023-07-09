import { Box, Stack, Typography, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Comment } from '../../types/types';
import { commentListItem } from '../../constants/testIds';

interface CommentListItemProps {
  comment: Comment;
}

export function CommentListItem({ comment }: CommentListItemProps) {
  const theme = useTheme();

  return (
    <Stack data-testid={commentListItem}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing() }}>
        <PersonIcon />
        <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
          {comment.user.username}
        </Typography>
      </Box>
      <Typography variant="body2">{comment.body}</Typography>
    </Stack>
  );
}
