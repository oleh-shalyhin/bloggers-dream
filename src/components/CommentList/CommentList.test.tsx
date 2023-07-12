import { render, screen } from '@testing-library/react';
import { commentListItem } from '../../constants/testIds';
import { commentsResponseMock, postsResponseMock } from '../../mocks/mocks';
import { CommentList } from './CommentList';

const post = postsResponseMock.posts[0];
const comments = commentsResponseMock.comments;

test('renders list of comments', async () => {
  render(<CommentList postId={post.id} />);

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/comments/i);
  expect(screen.getAllByTestId(commentListItem)).toHaveLength(comments.length);
});
