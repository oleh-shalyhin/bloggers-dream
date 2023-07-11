import { render, screen } from '@testing-library/react';
import { commentsResponseMock } from '../../mocks/mocks';
import { CommentList } from './CommentList';
import { commentListItem } from '../../constants/testIds';

const comments = commentsResponseMock.comments;

test('renders list of comments', async () => {
  render(<CommentList comments={comments} />);

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/comments/i);
  expect(screen.getAllByTestId(commentListItem)).toHaveLength(comments.length);
});
