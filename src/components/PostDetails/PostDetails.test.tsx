import { render, screen } from '@testing-library/react';
import { postsResponseMock, usersResponseMock } from '../../mocks/mocks';
import { getFullName } from '../../utils/utils';
import { PostDetails } from './PostDetails';

const post = postsResponseMock.posts[0];
const author = usersResponseMock.users[0];

test('renders post details', async () => {
  render(<PostDetails author={author} post={post} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(`Author: ${getFullName(author.firstName, author.lastName)}`)).toBeInTheDocument();
  expect(screen.getByText(post.body)).toBeInTheDocument();
});
