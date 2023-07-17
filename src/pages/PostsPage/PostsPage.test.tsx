import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getPostsUrl, searchPostsUrl } from '../../api/client';
import { noPostsMessage, postsLoadingFailedMessage } from '../../constants/constants';
import { postCard, postsSearchTagDeleteButton } from '../../constants/testIds';
import { postsResponseMock } from '../../mocks/mocks';
import { renderWithProviders } from '../../utils/testUtils';
import { PostsPage } from './PostsPage';

const posts = postsResponseMock.posts;

const server = setupServer(
  rest.get(getPostsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsResponseMock));
  }),
  rest.get(searchPostsUrl, (req, res, ctx) => {
    const post = posts[0];
    return res(ctx.status(200), ctx.json({ ...posts, posts: [post], total: 1 }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders list of post cards', async () => {
  renderWithProviders(<PostsPage />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findAllByTestId(postCard)).toHaveLength(posts.length);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders message when no posts found', async () => {
  server.use(
    rest.get(getPostsUrl, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ ...postsResponseMock, posts: [], total: 0 }));
    }),
  );
  renderWithProviders(<PostsPage />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(noPostsMessage)).toBeInTheDocument();
  expect(screen.queryByTestId(postCard)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders error message when request failed', async () => {
  server.use(
    rest.get(getPostsUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<PostsPage />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(postsLoadingFailedMessage)).toBeInTheDocument();
  expect(screen.queryByTestId(postCard)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('searches posts by text', async () => {
  const text = 'test';
  renderWithProviders(<PostsPage />);
  expect(await screen.findAllByTestId(postCard)).toHaveLength(posts.length);

  const searchInput = screen.getByRole('searchbox', { name: /search/i });
  fireEvent.change(searchInput, { target: { value: text } });
  expect(searchInput).toHaveValue(text);
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(await screen.findByRole('button', { name: `Search text: "${text}"` })).toBeInTheDocument();
  expect(await screen.findAllByTestId(postCard)).toHaveLength(1);
  expect(searchInput).toHaveValue('');

  fireEvent.click(screen.getByTestId(postsSearchTagDeleteButton));

  expect(await screen.findAllByTestId(postCard)).toHaveLength(posts.length);
  expect(screen.queryByRole('button', { name: `Search text: "${text}"` })).not.toBeInTheDocument();
});
