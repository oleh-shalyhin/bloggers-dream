import { Grid } from '@mui/material';
import { Post } from '../../types/types';
import { PostCard } from '../';

interface PostCardListProps {
  posts: Post[];
}

export function PostCardList({ posts }: PostCardListProps) {
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
