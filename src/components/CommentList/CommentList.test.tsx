import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getPostCommentsUrl } from '../../api/client';
import { postCommentsLoadingFailedMessage } from '../../constants/constants';
import { commentListItem } from '../../constants/testIds';
import { commentsResponseMock, postsResponseMock } from '../../mocks/mocks';
import { renderWithProviders } from '../../utils/testUtils';
import { CommentList } from './CommentList';

const post = postsResponseMock.posts[0];
const comments = commentsResponseMock.comments;

const server = setupServer(
  rest.get(getPostCommentsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsResponseMock));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders list of comments', async () => {
  renderWithProviders(<CommentList postId={post.id} />);

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/comments/i);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findAllByTestId(commentListItem)).toHaveLength(comments.length);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders error message when request failed', async () => {
  server.use(
    rest.get(getPostCommentsUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<CommentList postId={post.id} />);

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/comments/i);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(postCommentsLoadingFailedMessage)).toBeInTheDocument();
  expect(screen.queryByTestId(commentListItem)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
