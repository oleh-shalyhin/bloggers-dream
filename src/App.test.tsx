import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { postCard } from './constants/testIds';
import { handlers } from './mocks/handlers';
import { postsResponseMock } from './mocks/mocks';
import routes from './routes/routes';
import { renderWithProviders } from './utils/testUtils';
import App from './App';

const post = postsResponseMock.posts[0];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('navigates between PostsPage and PostDetailsPage', async () => {
  renderWithProviders(<App />, { routingOptions: { routes } });
  expect(await screen.findAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  expect(screen.queryByText(post.body)).not.toBeInTheDocument();

  await userEvent.click(screen.getAllByText(/read more/i)[0]);
  expect(await screen.findByText(post.body)).toBeInTheDocument();
  expect(screen.queryAllByTestId(postCard)).toHaveLength(0);

  await userEvent.click(screen.getByText(/blogger's dream/i));
  expect(await screen.findAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);
  expect(screen.queryByText(post.body)).not.toBeInTheDocument();
});

test('renders ErrorPage when navigated to not supported route', () => {
  renderWithProviders(<App />, {
    routingOptions: {
      routes,
      path: '/not-supported',
      initialEntries: ['/', '/not-supported'],
      initialIndex: 1,
    },
  });

  expect(screen.getByText(/oops/i)).toBeInTheDocument();
  expect(screen.getByText(/the page you were looking for is not found./i)).toBeInTheDocument();
});
