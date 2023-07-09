import { render, screen } from '@testing-library/react';
import { commentListItemAuthorIcon } from '../../constants/testIds';
import { commentsResponseMock } from '../../mocks';
import { CommentListItem } from './CommentListItem';

const comment = commentsResponseMock.comments[0];

test('renders single comment', async () => {
  render(<CommentListItem comment={comment} />);

  expect(screen.getByTestId(commentListItemAuthorIcon)).toBeInTheDocument();
  expect(screen.getByText(comment.user.username)).toBeInTheDocument();
  expect(screen.getByText(comment.body)).toBeInTheDocument();
});
