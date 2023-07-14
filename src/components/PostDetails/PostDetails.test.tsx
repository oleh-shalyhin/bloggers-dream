import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getUserUrl } from '../../api/client';
import { usersMock, postsResponseMock } from '../../mocks/mocks';
import { renderWithProviders } from '../../utils/testUtils';
import { getFullName } from '../../utils/utils';
import { PostDetails } from './PostDetails';

const post = postsResponseMock.posts[0];
const author = usersMock[0];
const authorName = getFullName(author.firstName, author.lastName);

const server = setupServer(
  rest.get(getUserUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(author));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders post details', async () => {
  renderWithProviders(<PostDetails post={post} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(post.body)).toBeInTheDocument();
  expect(await screen.findByText(`Author: ${authorName}`)).toBeInTheDocument();
});

test('renders author name when request failed but author is in store', async () => {
  server.use(
    rest.get(getUserUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<PostDetails post={post} />);

  expect(await screen.findByText(`Author: ${authorName}`)).toBeInTheDocument();
});

test('renders post details with Unknown Author when request failed and author missing in store', async () => {
  server.use(
    rest.get(getUserUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<PostDetails post={{ ...post, userId: 1000 }} />);

  expect(await screen.findByText(/author: unknown author/i)).toBeInTheDocument();
});
