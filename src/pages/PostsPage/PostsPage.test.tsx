import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { postCard } from '../../constants/testIds';
import { postsResponseMock } from '../../mocks/mocks';
import routes from '../../routes/routes';

const router = createMemoryRouter(routes, { initialEntries: ['/'] });
const appComponent = <RouterProvider router={router} />;

test('renders list of posts', async () => {
  render(appComponent);

  expect(screen.getAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  postsResponseMock.posts.forEach((post, i) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
  });
});
