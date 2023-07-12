import { render, screen } from '@testing-library/react';
import { usersResponseMock, postsResponseMock } from '../../mocks/mocks';
import { getFullName } from '../../utils/utils';
import { PostDetails } from './PostDetails';

const post = postsResponseMock.posts[0];
const author = usersResponseMock.users[0];
const authorName = getFullName(author.firstName, author.lastName);

test('renders post details', async () => {
  render(<PostDetails post={post} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(`Author: ${authorName}`)).toBeInTheDocument();
  expect(screen.getByText(post.body)).toBeInTheDocument();
});
