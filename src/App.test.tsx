import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { postCard } from './constants/testIds';
import { postsResponseMock } from './mocks/mocks';
import routes from './routes';

const router = createMemoryRouter(routes, { initialEntries: ['/'] });
const appComponent = <RouterProvider router={router} />;

test('navigates between PostsPage and PostDetailsPage', async () => {
  const firstPost = postsResponseMock.posts[0];
  render(appComponent);
  expect(await screen.findAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  expect(screen.queryByText(firstPost.body)).not.toBeInTheDocument();

  await userEvent.click(screen.getAllByText(/read more/i)[0]);
  expect(await screen.findByText(firstPost.body)).toBeInTheDocument();
  expect(screen.queryAllByTestId(postCard)).toHaveLength(0);

  await userEvent.click(screen.getByText(/blogger's dream/i));
  expect(await screen.findAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  expect(screen.queryByText(firstPost.body)).not.toBeInTheDocument();
});
