import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { postCardTruncateWordsAmount } from '../../constants/constants';
import { postCard } from '../../constants/testIds';
import { Post } from '../../types/types';
import { truncateTextByWords } from '../../utils/utils';
import { ChipList, ReactionsCounter } from '../';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card data-testid={postCard} elevation={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
        }
        subheader={<ChipList tags={post.tags} />}
      />
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Typography variant="body2">{`${truncateTextByWords(post.body, postCardTruncateWordsAmount)}...`}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <ReactionsCounter amount={post.reactions} />
        <Button component={RouterLink} to={`/posts/${post.id}`} variant="contained">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}
