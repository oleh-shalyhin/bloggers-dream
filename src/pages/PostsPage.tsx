import { Grid } from '@mui/material';
import { PostCard } from '../components';
import { postsResponseMock } from '../mocks';

const posts = postsResponseMock.posts;

function PostsPage() {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} md={6}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PostsPage;
