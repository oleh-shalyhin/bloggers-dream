import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { postsResponseMock, userMock as author } from '../../mocks';
import { Post } from '../../types/types';
import { PostDetails } from '../../components';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = postsResponseMock.posts.find((post) => postId && post.id === +postId) as Post;

  return (
    <Stack>
      <PostDetails author={author} post={post} />
    </Stack>
  );
}
