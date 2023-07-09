import { PostCardList } from '../../components';
import { postsResponseMock } from '../../mocks';

const posts = postsResponseMock.posts;

export function PostsPage() {
  return <PostCardList posts={posts} />;
}
