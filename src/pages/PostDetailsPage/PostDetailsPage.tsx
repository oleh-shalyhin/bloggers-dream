import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { commentsResponseMock, postsResponseMock, userMock as author } from '../../mocks';
import { Post } from '../../types/types';
import { CommentList, PostDetails } from '../../components';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = postsResponseMock.posts.find((post) => postId && post.id === +postId) as Post;

  return (
    <Stack spacing={4}>
      <PostDetails author={author} post={post} />
      <CommentList comments={commentsResponseMock.comments} />
    </Stack>
  );
}
