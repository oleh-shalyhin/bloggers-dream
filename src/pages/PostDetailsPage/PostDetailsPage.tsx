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

  let content;

  if (!postId) {
    content = null;
  } else if (postRequestStatus === 'loading') {
    content = <CircularProgress />;
  } else if (postRequestStatus === 'succeeded' && post) {
    content = (
      <Stack spacing={4}>
        <PostDetails post={post} />
        <CommentList postId={+postId} />
      </Stack>
    );
  } else if (postRequestStatus === 'failed' && postRequestError) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>
        {postRequestError}
      </Alert>
    );
  }

  return <Stack sx={{ alignItems: 'center' }}>{content}</Stack>;
}
