import { render, screen } from '@testing-library/react';
import { commentsResponseMock } from '../../mocks/mocks';
import { CommentList } from './CommentList';
import { commentListItem } from '../../constants/testIds';

const comments = { items: commentsResponseMock.comments, total: commentsResponseMock.comments.length };

test('renders list of comments', async () => {
  render(<CommentList />);

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/comments/i);
  expect(screen.getAllByTestId(commentListItem)).toHaveLength(comments.items.length);
});
