import { Stack, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPostAuthor, selectUserById } from '../../store/usersSlise';
import { Post } from '../../types/types';
import { getFullName } from '../../utils/utils';

interface PostDetailsProps {
  post: Post;
}

export function PostDetails({ post }: PostDetailsProps) {
  const theme = useTheme();
  const author = useAppSelector((state) => selectUserById(state, post.userId));
  const dispatch = useAppDispatch();

  const getAuthor = useCallback(async () => {
    try {
      await dispatch(fetchPostAuthor(post.userId)).unwrap();
    } catch (error) {
      console.error('Failed to load post author');
    }
  }, [post, dispatch]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  return (
    <Stack>
      <Typography variant="h4" component="h2">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
        Author: {author ? getFullName(author.firstName, author.lastName) : 'Unknown Author'}
      </Typography>
      <Typography variant="body2" sx={{ mt: theme.spacing(2) }}>
        {post.body}
      </Typography>
    </Stack>
  );
}
