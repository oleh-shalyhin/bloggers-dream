import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { postsLoadingFailedMessage } from '../../constants/constants';
import { postCard } from '../../constants/testIds';
import { postsResponseMock } from '../../mocks/mocks';
import { renderWithProviders } from '../../utils/testUtils';
import { PostCardList } from './PostCardList';

const posts = postsResponseMock.posts;

const server = setupServer(
  rest.get('https://dummyjson.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsResponseMock));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders list of post cards', async () => {
  renderWithProviders(<PostCardList />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findAllByTestId(postCard)).toHaveLength(posts.length);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders error message when request failed', async () => {
  server.use(
    rest.get('https://dummyjson.com/posts', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<PostCardList />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(postsLoadingFailedMessage)).toBeInTheDocument();
  expect(screen.queryByTestId(postCard)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
