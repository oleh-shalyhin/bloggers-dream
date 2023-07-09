import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { postsResponseMock, userMock } from '../../mocks';
import routes from '../../routes';
import { getFullName } from '../../utils/utils';

const post = postsResponseMock.posts[0];
const author = userMock;
const router = createMemoryRouter(routes, { initialEntries: ['/posts/1'] });
const postDetailsPage = <RouterProvider router={router} />;

test('renders post details page', async () => {
  render(postDetailsPage);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(`Author: ${getFullName(author.firstName, author.lastName)}`)).toBeInTheDocument();
  expect(screen.getByText(post.body)).toBeInTheDocument();
});
