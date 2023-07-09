import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { postCard } from './constants/testIds';
import { postsResponseMock } from './mocks';
import routes from './routes';

const router = createMemoryRouter(routes, { initialEntries: ['/'] });
const appComponent = <RouterProvider router={router} />;

test('navigates between PostsPage and PostDetailsPage', async () => {
  render(appComponent);
  expect(await screen.findAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  expect(screen.queryByText(/post details page/i)).not.toBeInTheDocument();

  await userEvent.click(screen.getAllByText(/read more/i)[0]);
  expect(await screen.findByText(/post details page/i)).toBeInTheDocument();
  expect(screen.queryAllByTestId(postCard)).toHaveLength(0);

  await userEvent.click(screen.getByText(/blogger's dream/i));
  expect(await screen.findAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  expect(screen.queryByText(/post details page/i)).not.toBeInTheDocument();
});
