import axios, { AxiosResponse } from 'axios';
import config from '../config';
import {
  AddPostCommentRequestPayload,
  Comment,
  GetPostCommentsRequestPayload,
  GetPostCommentsResponse,
  GetPostsResponse,
  PagedRequestPayload,
  Post,
  SearchPostsRequestPayload,
  User,
} from '../types/types';

const client = axios.create({});

export const getPostsUrl = config.baseUrl + config.endpoints.posts;
export const searchPostsUrl = config.baseUrl + config.endpoints.searchPosts;
export const getSinglePostUrl = config.baseUrl + config.endpoints.postById;
export const getUserUrl = config.baseUrl + config.endpoints.userById;
export const getPostCommentsUrl = config.baseUrl + config.endpoints.commentsByPostId;
export const addPostCommentUrl = config.baseUrl + config.endpoints.addPostComment;

export async function getPosts({ limit, skip }: PagedRequestPayload): Promise<GetPostsResponse> {
  const response = await client.get<GetPostsResponse>(getPostsUrl, {
    params: { limit, skip },
  });
  return response.data;
}

export async function searchPostsByText(payload: SearchPostsRequestPayload): Promise<GetPostsResponse> {
  const response = await client.get<GetPostsResponse>(searchPostsUrl, {
    params: payload,
  });
  return response.data;
}

export async function getSinglePost(postId: number): Promise<Post> {
  const url = getSinglePostUrl.replace(':postId', `${postId}`);
  const response = await client.get<Post>(url);
  return response.data;
}

export async function getUser(userId: number): Promise<User> {
  const url = getUserUrl.replace(':userId', `${userId}`);
  const response = await client.get<User>(url);
  return response.data;
}

export async function getPostComments({
  postId,
  limit,
  skip,
}: GetPostCommentsRequestPayload): Promise<GetPostCommentsResponse> {
  const url = getPostCommentsUrl.replace(':postId', `${postId}`);
  const response = await client.get<GetPostCommentsResponse>(url, {
    params: { limit, skip },
  });
  return response.data;
}

export async function addPostComment(payload: AddPostCommentRequestPayload): Promise<Comment> {
  const response: AxiosResponse<Comment, AddPostCommentRequestPayload> = await client.post(addPostCommentUrl, payload);
  return response.data;
}
