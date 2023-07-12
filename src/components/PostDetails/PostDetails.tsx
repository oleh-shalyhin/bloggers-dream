import { Stack, Typography, useTheme } from '@mui/material';
import { DetailedPost } from '../../types/types';

interface PostDetailsProps {
  post: DetailedPost;
}

export function PostDetails({ post }: PostDetailsProps) {
  const theme = useTheme();

  return (
    <Stack>
      <Typography variant="h4" component="h2">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
        Author: {post.userName}
      </Typography>
      <Typography variant="body2" sx={{ mt: theme.spacing(2) }}>
        {post.body}
      </Typography>
    </Stack>
  );
}
