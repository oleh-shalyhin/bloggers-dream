import { screen } from '@testing-library/react';
import { commentListItem, commentListItemAuthorIcon } from '../../constants/testIds';
import { commentsResponseMock } from '../../mocks/mocks';
import { renderWithProviders } from '../../utils/testUtils';
import { CommentListItem } from './CommentListItem';

const comment = commentsResponseMock.comments[0];

test('renders single comment', () => {
  renderWithProviders(<CommentListItem commentId={comment.id} />);

  expect(screen.getByTestId(commentListItemAuthorIcon)).toBeInTheDocument();
  expect(screen.getByText(comment.user.username)).toBeInTheDocument();
  expect(screen.getByText(comment.body)).toBeInTheDocument();
});

test('renders nothing when comment is missing', () => {
  renderWithProviders(<CommentListItem commentId={1000} />);
  expect(screen.queryByTestId(commentListItem)).not.toBeInTheDocument();
});
