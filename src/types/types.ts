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

export interface GetPostsRequestPayload {
  limit: number;
  skip: number;
}

export interface GetPostCommentsRequestPayload {
  postId: number;
  limit: number;
  skip: number;
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

export interface RequestStatus {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: boolean;
}
