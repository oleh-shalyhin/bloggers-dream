import { Alert, CircularProgress, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList, PostDetails } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSinglePost, postDetailsClosed, selectPostById } from '../../store/postsSlice';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, postId as string));
  const { status: postRequestStatus, error: postRequestError } = useAppSelector(
    (state) => state.posts.singlePostRequestStatus,
  );
  const dispatch = useAppDispatch();

  const getPost = useCallback(async () => {
    if (postId) {
      dispatch(fetchSinglePost(+postId));
    }
  }, [postId, dispatch]);

  useEffect(() => {
    getPost();

    return () => {
      dispatch(postDetailsClosed());
    };
  }, [dispatch, getPost]);

  const renderLoader = () => <CircularProgress />;

  const renderPostDetails = () => (
    <Stack spacing={4}>
      <PostDetails post={post} />
      <CommentList postId={+postId} />
    </Stack>
  );

  const renderErrorMessage = () => (
    <Alert severity="error" sx={{ width: '100%' }}>
      {postRequestError}
    </Alert>
  );

  const renderContent = () => {
    let content = null;

    if (!postId) {
      content = null;
    } else if (postRequestStatus === 'loading') {
      content = renderLoader();
    } else if (postRequestStatus === 'succeeded') {
      content = renderPostDetails();
    } else if (postRequestStatus === 'failed' && postRequestError !== null) {
      content = renderErrorMessage();
    }

    return content;
  };

  return <Stack sx={{ alignItems: 'center' }}>{renderContent()}</Stack>;
}
