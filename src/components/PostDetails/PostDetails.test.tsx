import { render, screen } from '@testing-library/react';
import { postsResponseMock, userMock } from '../../mocks';
import { getFullName } from '../../utils/utils';
import { PostDetails } from './PostDetails';

const post = postsResponseMock.posts[0];
const author = userMock;

test('renders post details', async () => {
  render(<PostDetails author={author} post={post} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(`Author: ${getFullName(author.firstName, author.lastName)}`)).toBeInTheDocument();
  expect(screen.getByText(post.body)).toBeInTheDocument();
});
