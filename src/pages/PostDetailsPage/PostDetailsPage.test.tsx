import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { singlePostLoadingFailedMessage } from '../../constants/constants';
import { commentListItem } from '../../constants/testIds';
import { commentsResponseMock, postsResponseMock, usersMock } from '../../mocks/mocks';
import { RoutingOptions, renderWithProviders } from '../../utils/testUtils';
import { PostDetailsPage } from './PostDetailsPage';

const post = postsResponseMock.posts[0];
const author = usersMock[0];
const comments = commentsResponseMock.comments;

const server = setupServer(
  rest.get('https://dummyjson.com/posts/:postId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(post));
  }),
  rest.get('https://dummyjson.com/users/:userId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(author));
  }),
  rest.get('https://dummyjson.com/comments/post/:postId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsResponseMock));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const routingOptions: RoutingOptions = {
  path: '/posts/:postId',
  initialEntries: ['/', `/posts/${post.id}`],
  initialIndex: 1,
};

test('renders post details page', async () => {
  renderWithProviders(<PostDetailsPage />, { routingOptions });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(post.body)).toBeInTheDocument();
  expect(await screen.findAllByTestId(commentListItem)).toHaveLength(comments.length);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders error message when request failed', async () => {
  server.use(
    rest.get('https://dummyjson.com/posts/:postId', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<PostDetailsPage />, { routingOptions });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(singlePostLoadingFailedMessage)).toBeInTheDocument();
  expect(screen.queryByText(post.body)).not.toBeInTheDocument();
  expect(screen.queryByTestId(commentListItem)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
