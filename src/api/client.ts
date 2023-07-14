import axios from 'axios';
import config from '../config';
import {
  GetPostCommentsRequestPayload,
  GetPostCommentsResponse,
  GetPostsRequestPayload,
  GetPostsResponse,
  Post,
  User,
} from '../types/types';

const client = axios.create({});

export const getPostsUrl = config.baseUrl + config.endpoints.posts;
export const getSinglePostUrl = config.baseUrl + config.endpoints.postById;
export const getUserUrl = config.baseUrl + config.endpoints.userById;
export const getPostCommentsUrl = config.baseUrl + config.endpoints.commentsByPostId;

export async function getPosts({ limit, skip }: GetPostsRequestPayload): Promise<GetPostsResponse> {
  const response = await client.get<GetPostsResponse>(getPostsUrl, {
    params: { limit, skip },
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
