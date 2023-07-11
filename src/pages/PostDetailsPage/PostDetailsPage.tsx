import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { commentsResponseMock, postsResponseMock, usersResponseMock } from '../../mocks/mocks';
import { Post } from '../../types/types';
import { CommentList, PostDetails } from '../../components';

const author = usersResponseMock.users[0];

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
