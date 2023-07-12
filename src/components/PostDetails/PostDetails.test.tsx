import { render, screen } from '@testing-library/react';
import { postsResponseMock } from '../../mocks/mocks';
import { PostDetails } from './PostDetails';

const post = { ...postsResponseMock.posts[0], userName: 'Test Name', comments: [] };

test('renders post details', async () => {
  render(<PostDetails post={post} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(`Author: ${post.userName}`)).toBeInTheDocument();
  expect(screen.getByText(post.body)).toBeInTheDocument();
});
