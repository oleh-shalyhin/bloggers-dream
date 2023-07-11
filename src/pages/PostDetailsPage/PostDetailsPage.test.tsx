import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { commentsResponseMock, postsResponseMock } from '../../mocks/mocks';
import routes from '../../routes';
import { commentListItem } from '../../constants/testIds';

const post = postsResponseMock.posts[0];
const comments = commentsResponseMock.comments;
const router = createMemoryRouter(routes, { initialEntries: ['/posts/1'] });
const postDetailsPage = <RouterProvider router={router} />;

test('renders post details page', async () => {
  render(postDetailsPage);

  expect(screen.getByText(post.body)).toBeInTheDocument();
  expect(screen.getAllByTestId(commentListItem)).toHaveLength(comments.length);
});
