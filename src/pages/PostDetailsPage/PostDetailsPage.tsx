import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { postsResponseMock, userMock as author } from '../../mocks';
import { getFullName } from '../../utils/utils';
import { Post } from '../../types/types';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = postsResponseMock.posts.find((post) => postId && post.id === +postId) as Post;

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
