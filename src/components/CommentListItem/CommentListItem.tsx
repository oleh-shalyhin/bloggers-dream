import PersonIcon from '@mui/icons-material/Person';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
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
        <PersonIcon sx={{ color: grey[600] }} />
        <Typography variant="subtitle2">{comment.user.username}</Typography>
      </Box>
      <Typography variant="body1">{comment.body}</Typography>
    </Stack>
  );
}
