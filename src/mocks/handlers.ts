import { rest } from 'msw';
import {
  addPostCommentUrl,
  getPostCommentsUrl,
  getPostsUrl,
  getSinglePostUrl,
  getUserUrl,
  searchPostsUrl,
} from '../api/client';
import { commentsResponseMock, postsResponseMock, usersMock } from './mocks';
import { AddPostCommentRequestPayload, Comment } from '../types/types';

export const handlers = [
  rest.get(getPostsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsResponseMock));
  }),
  rest.get(searchPostsUrl, (req, res, ctx) => {
    const query = req.url.searchParams;
    const searchText = query.get('q');
    const newPosts = postsResponseMock.posts.filter((post) => post.body.includes(searchText as string));

    return res(ctx.status(200), ctx.json({ ...postsResponseMock, posts: newPosts, total: newPosts.length }));
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
  rest.post(addPostCommentUrl, async (req, res, ctx) => {
    const payload = await req.json<AddPostCommentRequestPayload>();
    const user = usersMock[0];
    const newComment: Comment = {
      id: new Date().getTime(),
      body: payload.body,
      postId: payload.postId,
      user: {
        id: user.id,
        username: user.username,
      },
    };
    return res(ctx.status(200), ctx.json(newComment));
  }),
];
