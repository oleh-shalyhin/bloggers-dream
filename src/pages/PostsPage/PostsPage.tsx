import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { noPostsMessage, postsLoadingFailedMessage } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPosts, selectPosts } from '../../store/slices';
import { ErrorMessage, Loader, PostCardList, SearchPosts } from '../../components';

export function PostsPage() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, posts.page, posts.searchText]);

  const noContentText = () => (
    <Typography variant="body1" textAlign="center">
      {noPostsMessage}
    </Typography>
  );

  const renderContent = () => {
    let content = null;
    const { postsRequestStatus: status } = posts;

    if (status === 'loading') {
      content = <Loader />;
    } else if (status === 'succeeded' && posts.items.length === 0) {
      content = noContentText();
    } else if (status === 'succeeded') {
      content = <PostCardList />;
    } else if (status === 'failed') {
      content = <ErrorMessage message={postsLoadingFailedMessage} />;
    }

    return content;
  };

  return (
    <Stack spacing={5}>
      <SearchPosts />
      {renderContent()}
    </Stack>
  );
}
