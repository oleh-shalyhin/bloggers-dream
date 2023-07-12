export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface DetailedPost extends Post {
  userName: string;
  comments: Comment[];
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
