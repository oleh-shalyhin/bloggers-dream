import { Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPostAuthor, selectUserById } from '../../store/usersSlise';
import { Post } from '../../types/types';
import { getFullName } from '../../utils/utils';

interface PostDetailsProps {
  post: Post;
}

export function PostDetails({ post }: PostDetailsProps) {
  const theme = useTheme();
  const [isAuthorLoading, setIsAuthorLoading] = useState(false);
  const author = useAppSelector((state) => selectUserById(state, post.userId));
  const dispatch = useAppDispatch();

  const getAuthor = useCallback(async () => {
    try {
      setIsAuthorLoading(true);
      await dispatch(fetchPostAuthor(post.userId)).unwrap();
    } catch (error) {
      console.error('Failed to load post author');
    } finally {
      setIsAuthorLoading(false);
    }
  }, [post, dispatch]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  const renderAuthorName = () => {
    let content;

    if (isAuthorLoading) {
      content = <Skeleton sx={{ width: 200, display: 'inline-block' }} />;
    } else if (author) {
      content = getFullName(author.firstName, author.lastName);
    } else {
      content = 'Unknown Author';
    }

    return content;
  };

  return (
    <Stack>
      <Typography variant="h4" component="h2">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
        Author: {renderAuthorName()}
      </Typography>
      <Typography variant="body2" sx={{ mt: theme.spacing(2) }}>
        {post.body}
      </Typography>
    </Stack>
  );
}
