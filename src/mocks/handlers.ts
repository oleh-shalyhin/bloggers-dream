import { rest } from 'msw';
import { getPostCommentsUrl, getPostsUrl, getSinglePostUrl, getUserUrl } from '../api/client';
import { commentsResponseMock, postsResponseMock, usersMock } from './mocks';

export const handlers = [
  rest.get(getPostsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsResponseMock));
  }),
  rest.get(getSinglePostUrl, (req, res, ctx) => {
    const { postId } = req.params;
    const post = postsResponseMock.posts.find((post) => post.id === +postId);
    if (!post) {
      return res(ctx.status(404), ctx.json({ message: `Cannot find post with id ${postId}` }));
    }

    return res(ctx.status(200), ctx.json(post));
  }),
  rest.get(getUserUrl, (req, res, ctx) => {
    const { userId } = req.params;
    const user = usersMock.find((user) => user.id === +userId);
    if (!user) {
      return res(ctx.status(404), ctx.json({ message: `Cannot find user with id ${userId}` }));
    }

    return res(ctx.status(200), ctx.json(user));
  }),
  rest.get(getPostCommentsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsResponseMock));
  }),
];
