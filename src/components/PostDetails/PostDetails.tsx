import { Skeleton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPostAuthor, selectUserById } from '../../store/usersSlice';
import { Post } from '../../types/types';
import { getFullName } from '../../utils/utils';

interface PostDetailsProps {
  post: Post;
}

export function PostDetails({ post }: PostDetailsProps) {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleVariant = mobile ? 'h6' : tablet ? 'h5' : 'h4';

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
      content = <Skeleton animation={false} sx={{ width: 200, display: 'inline-block' }} />;
    } else if (author) {
      content = getFullName(author.firstName, author.lastName);
    } else {
      content = 'Unknown Author';
    }

    return content;
  };

  return (
    <Stack component="article">
      <Typography variant={titleVariant} component="h2">
        {post.title}
      </Typography>
      <Typography variant="subtitle2">Author: {renderAuthorName()}</Typography>
      <Typography variant="body1" sx={{ mt: 4 }}>
        {post.body}
      </Typography>
    </Stack>
  );
}
