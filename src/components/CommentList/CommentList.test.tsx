import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { addPostCommentUrl, getPostCommentsUrl } from '../../api/client';
import {
  addPostCommentFailedMessage,
  noCommentsMessage,
  postCommentsLoadingFailedMessage,
} from '../../constants/constants';
import { commentListItem } from '../../constants/testIds';
import { commentsResponseMock, postsResponseMock, usersMock } from '../../mocks/mocks';
import { Comment } from '../../types/types';
import { renderWithProviders } from '../../utils/testUtils';
import { CommentList } from './CommentList';

const post = postsResponseMock.posts[0];
const user = usersMock[0];
const comments = commentsResponseMock.comments;
const newComment: Comment = {
  id: 4,
  postId: post.id,
  body: 'Test comment',
  user: {
    id: user.id,
    username: user.username,
  },
};

const server = setupServer(
  rest.get(getPostCommentsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsResponseMock));
  }),
  rest.post(addPostCommentUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(newComment));
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

test('renders message when post has no comments', async () => {
  server.use(
    rest.get(getPostCommentsUrl, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ ...commentsResponseMock, comments: [], total: 0 }));
    }),
  );
  renderWithProviders(<CommentList postId={post.id} />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(noCommentsMessage)).toBeInTheDocument();
  expect(screen.queryByTestId(commentListItem)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders error message when failed to fetch comments', async () => {
  server.use(
    rest.get(getPostCommentsUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<CommentList postId={post.id} />);

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/comments/i);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText(postCommentsLoadingFailedMessage)).toBeInTheDocument();
  expect(screen.queryByRole('textbox', { name: /add a comment.../i })).not.toBeInTheDocument();
  expect(screen.queryByTestId(commentListItem)).not.toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('adds comment to the list', async () => {
  renderWithProviders(<CommentList postId={post.id} />);
  expect(await screen.findAllByTestId(commentListItem)).toHaveLength(comments.length);

  const addCommentInput = screen.getByRole('textbox', { name: /add a comment.../i });
  fireEvent.change(addCommentInput, { target: { value: newComment.body } });
  expect(addCommentInput).toHaveValue(newComment.body);
  fireEvent.click(screen.getByRole('button', { name: /comment/i }));

  await waitFor(() => expect(addCommentInput).toHaveValue(''));
  await waitFor(() => expect(screen.getAllByTestId(commentListItem)).toHaveLength(comments.length + 1));
  const firstComment = screen.getAllByTestId(commentListItem)[0];
  expect(within(firstComment).getByText(newComment.user.username)).toBeInTheDocument();
  expect(within(firstComment).getByText(newComment.body)).toBeInTheDocument();
});

test('renders error message when failed to add comment and hides it when succeeded to add comment', async () => {
  server.use(
    rest.post(addPostCommentUrl, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  renderWithProviders(<CommentList postId={post.id} />);
  expect(await screen.findAllByTestId(commentListItem)).toHaveLength(comments.length);

  const addCommentInput = screen.getByRole('textbox', { name: /add a comment.../i });
  fireEvent.change(addCommentInput, { target: { value: newComment.body } });
  expect(addCommentInput).toHaveValue(newComment.body);

  fireEvent.click(screen.getByRole('button', { name: /comment/i }));
  expect(await screen.findByText(addPostCommentFailedMessage)).toBeInTheDocument();
  expect(addCommentInput).toHaveValue(newComment.body);
  expect(await screen.findAllByTestId(commentListItem)).toHaveLength(comments.length);

  server.use(
    rest.post(addPostCommentUrl, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(newComment));
    }),
  );
  fireEvent.click(screen.getByRole('button', { name: /comment/i }));

  await waitFor(() => expect(addCommentInput).toHaveValue(''));
  await waitFor(() => expect(screen.getAllByTestId(commentListItem)).toHaveLength(comments.length + 1));
  expect(screen.queryByText(addPostCommentFailedMessage)).not.toBeInTheDocument();

  const firstComment = screen.getAllByTestId(commentListItem)[0];
  expect(within(firstComment).getByText(newComment.user.username)).toBeInTheDocument();
  expect(within(firstComment).getByText(newComment.body)).toBeInTheDocument();
});
