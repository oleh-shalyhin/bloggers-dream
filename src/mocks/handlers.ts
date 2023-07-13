import { rest } from 'msw';
import { commentsResponseMock, postsResponseMock, usersMock } from './mocks';

export const handlers = [
  rest.get('https://dummyjson.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsResponseMock));
  }),
  rest.get('https://dummyjson.com/posts/:postId', (req, res, ctx) => {
    const { postId } = req.params;
    const post = postsResponseMock.posts.find((post) => post.id === +postId);
    if (!post) {
      return res(ctx.status(404), ctx.json({ message: `Cannot find post with id ${postId}` }));
    }

    return res(ctx.status(200), ctx.json(post));
  }),
  rest.get('https://dummyjson.com/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    const user = usersMock.find((user) => user.id === +userId);
    if (!user) {
      return res(ctx.status(404), ctx.json({ message: `Cannot find user with id ${userId}` }));
    }

    return res(ctx.status(200), ctx.json(user));
  }),
  rest.get('https://dummyjson.com/comments/post/:postId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsResponseMock));
  }),
];
