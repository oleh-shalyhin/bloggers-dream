import PersonIcon from '@mui/icons-material/Person';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { EntityId } from '@reduxjs/toolkit';
import { commentListItem } from '../../constants/testIds';
import { selectCommentById } from '../../store/commentsSlice';
import { useAppSelector } from '../../store/hooks';

interface CommentListItemProps {
  commentId: EntityId;
}

export function CommentListItem({ commentId }: CommentListItemProps) {
  const theme = useTheme();
  const comment = useAppSelector((state) => selectCommentById(state, commentId));

  if (!comment) {
    return null;
  }

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
