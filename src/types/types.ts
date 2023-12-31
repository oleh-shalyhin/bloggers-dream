export interface PagedResponse {
  total: number;
  limit: number;
  skip: number;
}

export interface GetPostsResponse extends PagedResponse {
  posts: Post[];
}

export interface GetPostCommentsResponse extends PagedResponse {
  comments: Comment[];
}

export interface PagedRequestPayload {
  limit: number;
  skip: number;
}

export interface SearchPostsRequestPayload extends PagedRequestPayload {
  q: string;
}

export interface GetPostCommentsRequestPayload extends PagedRequestPayload {
  postId: number;
}

export interface AddPostCommentRequestPayload {
  postId: number;
  userId: number;
  body: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: Pick<User, 'id' | 'username'>;
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
