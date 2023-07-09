import { Stack, Typography } from '@mui/material';
import { getFullName } from '../../utils/utils';
import { Post, User } from '../../types/types';

interface PostDetailsProps {
  post: Post;
  author: User;
}

export function PostDetails({ post, author }: PostDetailsProps) {
  return (
    <Stack>
      <Typography variant="h4" component="h2">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
        Author: {getFullName(author.firstName, author.lastName)}
      </Typography>
      <Typography variant="body2">{post.body}</Typography>
    </Stack>
  );
}
